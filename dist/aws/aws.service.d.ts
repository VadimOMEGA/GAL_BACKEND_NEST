export declare class AwsService {
    private s3;
    generateUploadLink(destination: string): Promise<{
        success: boolean;
        uploadUrl: string;
        publicUrl: string;
        key: string;
    }>;
    deleteImages(images: string[]): Promise<{
        success: boolean;
    }>;
    generatePdfUploadLink(destination: string): Promise<{
        success: boolean;
        uploadUrl: string;
        publicUrl: string;
        key: string;
    }>;
}
