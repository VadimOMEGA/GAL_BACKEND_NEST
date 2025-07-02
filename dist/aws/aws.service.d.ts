export declare class AwsService {
    private s3;
    generateUploadLink(id: string, destination: string): Promise<{
        success: boolean;
        imageUrl: string;
        key: string;
    }>;
    deleteImages(images: string[]): Promise<{
        success: boolean;
    }>;
}
