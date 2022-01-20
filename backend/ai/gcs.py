from google.cloud import storage

def download_blob(filename):
    
    filename = "image/" + filename
    """Downloads a blob from the bucket."""
    # bucket_name = "your-bucket-name"
    # source_blob_name = "storage-object-name"
    # destination_file_name = "local/path/to/file"

    storage_client = storage.Client()
    bucket_name = 'lego2me__image'
    destination_file_name = "/backend/ai/image"

    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(filename)
    blob.download_to_filename(destination_file_name)