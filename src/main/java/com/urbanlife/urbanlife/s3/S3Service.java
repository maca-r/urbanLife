package com.urbanlife.urbanlife.s3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.ResponseBytes;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

import java.io.IOException;
import java.net.URL;
import java.util.UUID;

@Service
public class S3Service {
    private final S3Client s3Client;
    @Autowired
    public S3Service(S3Client s3Client) { this.s3Client = s3Client;}
    public void uploadFile(String bucketName, byte[] file, String key) throws IOException {
        //String extension = StringUtils.getFilenameExtension(file.getOriginalFilename());
        //String key = String.format("%s.%s", UUID.randomUUID(), extension);
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(key)
                    .build();
            putObjectRequest.acl();
            s3Client.putObject(putObjectRequest, RequestBody.fromBytes(file));
    }
    public byte[] getObjectBytes(String bucketName,String keyName) {
        try {
            GetObjectRequest objectRequest = GetObjectRequest
                    .builder()
                    .key(keyName)
                    .bucket(bucketName)
                    .build();
            ResponseBytes<GetObjectResponse> objectBytes = s3Client.getObjectAsBytes(objectRequest);
            return objectBytes.asByteArray();
        }catch (S3Exception e) {
            System.err.println(e.awsErrorDetails().errorMessage());
            System.exit(1);
            throw new RuntimeException(e);
        }
    }

    public String getObjectUrl(String key) {
        return String.format("http://%s.s3.amazonaws.com/%s", "springboots3awstest", key);
    }
    public void getURL(String bucketName,String keyName ) {

        try {
            GetUrlRequest request = GetUrlRequest.builder()
                    .bucket(bucketName)
                    .key(keyName)
                    .build();

            URL url = s3Client.utilities().getUrl(request);
            System.out.println("The URL for  "+keyName +" is "+ url);

        } catch (S3Exception e) {
            System.err.println(e.awsErrorDetails().errorMessage());
            System.exit(1);
        }
    }

}
