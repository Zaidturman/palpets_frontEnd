from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import User
from .serializers import (
    UserRegistrationSerializer, UserLoginSerializer,
    UserProfileSerializer, UserListSerializer,
    ChangePasswordSerializer
)

class UserRegistrationView(generics.CreateAPIView):
    """
    API لتسجيل مستخدم جديد
    """
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        # إنشاء tokens للمستخدم الجديد
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'user': UserProfileSerializer(user).data,
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'message': 'تم إنشاء الحساب بنجاح'
        }, status=status.HTTP_201_CREATED)

class UserLoginView(APIView):
    """
    API لتسجيل الدخول
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'user': UserProfileSerializer(user).data,
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'message': 'تم تسجيل الدخول بنجاح'
        })

class UserProfileView(generics.RetrieveUpdateAPIView):
    """
    API لعرض وتحديث الملف الشخصي للمستخدم الحالي
    """
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

class UserListView(generics.ListAPIView):
    """
    API لعرض قائمة المستخدمين (للمشرفين فقط)
    """
    queryset = User.objects.all()
    serializer_class = UserListSerializer
    permission_classes = [permissions.IsAdminUser]
    filterset_fields = ['user_type', 'is_verified', 'city']
    search_fields = ['username', 'email', 'first_name', 'last_name']

class UserDetailView(generics.RetrieveAPIView):
    """
    API لعرض تفاصيل مستخدم معين
    """
    queryset = User.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'id'

class ChangePasswordView(APIView):
    """
    API لتغيير كلمة المرور
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        user = request.user
        
        # التحقق من كلمة المرور القديمة
        if not user.check_password(serializer.validated_data['old_password']):
            return Response(
                {'old_password': 'كلمة المرور القديمة غير صحيحة'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # تعيين كلمة المرور الجديدة
        user.set_password(serializer.validated_data['new_password'])
        user.save()
        
        return Response(
            {'message': 'تم تغيير كلمة المرور بنجاح'},
            status=status.HTTP_200_OK
        )

class LogoutView(APIView):
    """
    API لتسجيل الخروج (Blacklist refresh token)
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data.get('refresh')
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(
                {'message': 'تم تسجيل الخروج بنجاح'},
                status=status.HTTP_205_RESET_CONTENT
            )
        except Exception:
            return Response(
                {'message': 'حدث خطأ أثناء تسجيل الخروج'},
                status=status.HTTP_400_BAD_REQUEST
            )