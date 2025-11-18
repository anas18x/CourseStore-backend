process.loadEnvFile()
export const ENV = {
    MONGO_URI : process.env.MONGO_URI,
    PORT : process.env.PORT,
    JWT_SECRET : process.env.JWT_SECRET,
    CLOUDINARY_CLOUD_NAME : process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY : process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET : process.env.CLOUDINARY_API_SECRET
}