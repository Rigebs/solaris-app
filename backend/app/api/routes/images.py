from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.params import Depends
from app.api.deps import get_current_active_superuser
import cloudinary.uploader

router = APIRouter()

@router.post("/upload", summary="Upload a single image to Cloudinary")
async def upload_image(file: UploadFile = File(...),
                       current_user=Depends(get_current_active_superuser)):
    try:
        uploaded = cloudinary.uploader.upload(
            await file.read(),
            folder="products"
        )
        return {
            "url": uploaded["secure_url"],
            "public_id": uploaded["public_id"]
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/{public_id}", summary="Delete an image from Cloudinary")
async def delete_image(public_id: str, 
                       current_user=Depends(get_current_active_superuser)):
    cloudinary.uploader.destroy(public_id)
    return {"message": "Image deleted"}
