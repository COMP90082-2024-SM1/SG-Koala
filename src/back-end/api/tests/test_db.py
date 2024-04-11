from django.test import TestCase
from pymongo import MongoClient
from mongomock import MongoClient as MockMongoClient
from django.conf import settings

class DBTest(TestCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        # Connect to the test database
        if settings.TESTING:
            # Use mongomock for testing
            cls.client = MockMongoClient()
        else:
            # Connect to the actual MongoDB database
            config = settings.DMONGODB_DATABASES['default']
            cls.client = MongoClient(host=config['host'])
        
        cls.db = cls.client["unit_test"]
        cls.collection = cls.db['template_test']

    
    def test_template_insertion(self):
        # Insert a document
        self.collection.insert_one( 
            {
            "template_name": "Template test",
            "tasks": [
                {
                "task_name": "Priava",
                "order": 1,
                "link": "https://apac-app.priava.com/api/login/dist/#/"
                },
                {
                "task_name": "Place bookings...",
                "order": 2
                }]
        })
        # Retrieve the document
        document = self.collection.find_one({'template_name': 'Template test'})
        # Assertions
        self.assertIsNotNone(document)
        self.assertEqual(document['tasks'][0]['task_name'], 'Priava')
        # Count database document
        count = self.collection.count_documents({})
        self.assertEqual(count, 1)

        
    def test_template_delete(self):
        # Insert a document
        self.collection.insert_one( 
            {
            "template_name": "Template test",
            "tasks": [
                {
                "task_name": "Priava",
                "order": 1,
                "link": "https://apac-app.priava.com/api/login/dist/#/"
                },
                {
                "task_name": "Place bookings...",
                "order": 2
                }]
        })
        # Retrieve the document
        document = self.collection.find_one({'template_name': 'Template test'})
        # Assertions
        self.assertIsNotNone(document)
        # Count database document
        count = self.collection.count_documents({})
        self.assertEqual(count, 1)

        # Delete the document
        self.collection.delete_one({'template_name': 'Template test'})
        # Assert the document is deleted
        deleted_document = self.collection.find_one({'template_name': 'Template test'})
        self.assertIsNone(deleted_document)

    @classmethod
    def tearDownClass(cls):
        if settings.TESTING:
            cls.client.close()

        super().tearDownClass()

    def _fixture_teardown(self):
        pass  # Override to prevent Django from trying to tear down the database 



