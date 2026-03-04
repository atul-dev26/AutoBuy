package com.autobuy.autobuy_backend.controller;

import com.autobuy.autobuy_backend.service.UploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/uploads")
@RequiredArgsConstructor
public class UploadController {

    private final UploadService uploadService;

    @PostMapping("/cars/{carId}/image")
    @PreAuthorize("hasRole('DEALER')")
    public ResponseEntity<Map<String, String>> uploadCarImage(@PathVariable Long carId,
                                                              @RequestParam("file") MultipartFile file,
                                                              Authentication authentication) {
        String imageUrl = uploadService.uploadCarImage(carId, file, authentication.getName());
        return ResponseEntity.ok(Map.of("imageUrl", imageUrl));
    }
}
