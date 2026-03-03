import os
import asyncio
from dotenv import load_dotenv
from supabase import create_client, Client

# Load environment variables
load_dotenv()

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_ANON_KEY")

print(f"Testing connection to: {url}")
print(f"Using Key: {key[:20]}...")

try:
    supabase: Client = create_client(url, key)
    # Perform a lightweight check. 
    # Listing users requires service role, but sign_up (or attempting it) uses anon.
    # We'll just try to sign up a random user to see if we get a 401/403 or a logical error.
    print("Attempting to connect...")
    
    # We can't easily "ping", so we'll try a harmless auth operation
    # or just checking if the client initializes without crashing.
    # The 'create_client' doesn't make a network request immediately.
    # We need to make a call.
    
    # Let's try to sign up a dummy user. 
    # If the key is invalid, this will raise a specific exception.
    res = supabase.auth.sign_up({
        "email": "realuser@gmail.com", 
        "password": "valid_password_123"
    })
    
    print("✅ Connection Successful!")
    print(f"Response User ID: {res.user.id if res.user else 'No user created (maybe verify email flow)'}")

except Exception as e:
    print("❌ Connection Failed")
    print(f"Error details: {e}")
