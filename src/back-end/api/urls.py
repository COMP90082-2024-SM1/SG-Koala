from django.contrib import admin
from django.urls import path,include
from . import views,booking_view

urlpatterns = [
    path('test/create/', views.create_item),
    path('test/get/', views.get_item),
    path('booking/', booking_view.BookingView.as_view()),
    path('booking/<str:id>/', booking_view.BookingViewID.as_view()),

]
