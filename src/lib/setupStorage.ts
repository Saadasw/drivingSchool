import { supabase } from './supabase';

export const setupStorage = async () => {
  try {
    console.log('Setting up storage buckets...');

    // Create gallery bucket if it doesn't exist
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.error('Error listing buckets:', listError);
      return;
    }

    const galleryBucketExists = buckets?.some(bucket => bucket.name === 'gallery');
    
    if (!galleryBucketExists) {
      const { error: createError } = await supabase.storage.createBucket('gallery', {
        public: true,
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
        fileSizeLimit: 5242880 // 5MB
      });

      if (createError) {
        console.error('Error creating gallery bucket:', createError);
      } else {
        console.log('Gallery bucket created successfully');
      }
    } else {
      console.log('Gallery bucket already exists');
    }

  } catch (error) {
    console.error('Storage setup failed:', error);
  }
};

export const uploadImage = async (file: File): Promise<string> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('gallery')
      .upload(fileName, file);

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('gallery')
      .getPublicUrl(fileName);

    return publicUrl;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};

export const deleteImage = async (imageUrl: string): Promise<void> => {
  try {
    // Extract filename from URL
    const urlParts = imageUrl.split('/');
    const fileName = urlParts[urlParts.length - 1];
    
    const { error } = await supabase.storage
      .from('gallery')
      .remove([fileName]);

    if (error) throw error;
  } catch (error) {
    console.error('Delete error:', error);
    throw error;
  }
};
