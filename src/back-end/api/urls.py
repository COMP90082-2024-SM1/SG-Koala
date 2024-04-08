from django.contrib import admin
from django.urls import path,include

from api.views import checklist_view
from . import test_views,booking_view

urlpatterns = [
    path('checklist/', checklist_view.ChecklistView.as_view()),
    path('test/get/', test_views.get_bookings),
    path('booking/', booking_view.BookingView.as_view()),
    path('booking/<str:id>/', booking_view.BookingViewID.as_view()),

]
