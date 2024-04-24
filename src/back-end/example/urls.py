# example/urls.py
from django.urls import path




from example.views import views,school_view,booking_view,checklist_view,template_view,miscellaneous_view

urlpatterns = [
    path('', views.index),
    path('booking/', booking_view.BookingView.as_view(), name="booking"),
    path('booking/<str:id>/', booking_view.BookingViewID.as_view(), name="booking_id"),
    path('school/', school_view.SchoolView.as_view(), name="school"),
    path('school/<str:id>/',  school_view.SchoolViewID.as_view(), name="school_id"),
    path('template/', template_view.TemplateView.as_view(), name="template"),
    path('template/<str:id>/',  template_view.TemplateViewID.as_view(), name="template_id"),
    path('checklist/', checklist_view.ChecklistView.as_view(), name="checklist"),
    path('checklist/<str:id>/',  checklist_view.ChecklistViewID.as_view(), name="checklist_id"),
    path('miscellaneous/', miscellaneous_view.MiscellaneousView.as_view()),
]