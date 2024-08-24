from . import views
from .views import *
from django.urls import path, include

urlpatterns = [
    path("test/", ItemViewSet.as_view(), name="register"),
]