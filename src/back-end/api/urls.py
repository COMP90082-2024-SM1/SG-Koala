from django.contrib import admin
from django.urls import path,include

from api.views import checklist_view, template_view
from . import test_views,booking_view

urlpatterns = [
    path('checklist/', checklist_view.ChecklistView.as_view()),
    path('checklist/<str:id>/', checklist_view.ChecklistViewID.as_view()),

    path('template/', template_view.TemplateView.as_view()),
    path('template/<str:id>/', template_view.TemplateViewID.as_view()),
    
    path('booking/', booking_view.BookingView.as_view()),
    path('booking/<str:id>/', booking_view.BookingViewID.as_view()),

]
