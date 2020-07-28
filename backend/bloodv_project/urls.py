"""bloodv_project URL Configuration
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from rest_framework.documentation import include_docs_urls

urlpatterns = [
    path('backend/api/admin/', admin.site.urls),
    # Registration Urls
    path('backend/api/auth/', include('apps.registrations.urls')),
    # User Urls
    path('backend/api/', include('apps.users.urls')),
    # Seeker Urls
    path('backend/api/seeker/', include('apps.seekerprofiles.urls')),
    # Donor Urls
    path('backend/api/donor/', include('apps.donorprofiles.urls')),
    # Blood Request Urls
    path('backend/api/request/', include('apps.bloodrequests.urls')),
    # Offered Tests Urls
    path('backend/api/tests/', include('apps.offeredtests.urls')),
    # Test Results Urls
    path('backend/api/results/', include('apps.testresults.urls')),
    # Docs
    path('backend/api/docs/', include_docs_urls(title='BloodValU Endpoints', public=True, permission_classes=[])),
]

# Images Urls..
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
