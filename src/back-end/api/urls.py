from django.contrib import admin
from django.urls import path,include



from .views import test_views,school_view,booking_view,checklist_view,template_view,miscellaneous_view


urlpatterns = [


    path('booking/', booking_view.BookingView.as_view()),
    path('booking/<str:id>/', booking_view.BookingViewID.as_view()),
    path('school/', school_view.SchoolView.as_view()),
    path('school/<str:id>/',  school_view.SchoolViewID.as_view()),
    path('template/', template_view.TemplateView.as_view()),
    path('template/<str:id>/',  template_view.TemplateViewID.as_view()),
    path('checklist/', checklist_view.ChecklistView.as_view()),
    path('checklist/<str:id>/',  checklist_view.ChecklistViewID.as_view()),
    path('miscellaneous/', miscellaneous_view.MiscellaneousView.as_view()),

]
