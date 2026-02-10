from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoriesViewSet, DragsViewSet, DoctorsViewSet, DoctorDragViewSet, DoctorPaymentViewSet

router = DefaultRouter()
router.register(r'categories', CategoriesViewSet, basename='category')
router.register(r'drags', DragsViewSet, basename='drag')
router.register(r'doctors', DoctorsViewSet)
router.register(r'doctor-payments', DoctorPaymentViewSet)
router.register(r'doctor-drags', DoctorDragViewSet)

# Use DoctorDragListCreateView for list and create operations
urlpatterns = [
    path('', include(router.urls)),
]
