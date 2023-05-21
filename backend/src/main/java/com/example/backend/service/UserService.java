package com.example.backend.service;

import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    Pageable pageable;
    private static final String ALGORITHM = "AES";
    private static final String KEY = "mySecretKey12345"; // Replace with your own secret key

    public static String encrypt(String plaintext) throws Exception {
        SecretKeySpec secretKey = new SecretKeySpec(KEY.getBytes(StandardCharsets.UTF_8), ALGORITHM);
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        cipher.init(Cipher.ENCRYPT_MODE, secretKey);
        byte[] encryptedBytes = cipher.doFinal(plaintext.getBytes(StandardCharsets.UTF_8));
        return Base64.getEncoder().encodeToString(encryptedBytes);
    }

    public static String decrypt(String encryptedText) throws Exception {
        SecretKeySpec secretKey = new SecretKeySpec(KEY.getBytes(StandardCharsets.UTF_8), ALGORITHM);
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        cipher.init(Cipher.DECRYPT_MODE, secretKey);
        byte[] encryptedBytes = Base64.getDecoder().decode(encryptedText);
        byte[] decryptedBytes = cipher.doFinal(encryptedBytes);
        return new String(decryptedBytes, StandardCharsets.UTF_8);
    }

    public List<User> retrieveUsers() {
        return (List<User>) userRepository.findAll();
    }

    public User retrieveUserById(Long cnp) {

        Optional<User> user = userRepository.findById(cnp);

        if(user.isPresent()) {
            return user.get();
        } else {
            return null;
        }
    }

    public User retrieveUserByEmail(String email){
        User user = (User) userRepository.findUserByEMail(email, pageable).getContent();
        return user;
    }

    public User checkPassword(String password) throws Exception {
        System.out.println(password);
        String words[] = password.split(" ");
        String encryptedPass = encrypt(words[0]);
        User user = this.retrieveUserById(Long.parseLong(words[1]));
        System.out.println("Provided password: " + encryptedPass);
        System.out.println("User password: " + user.getPassword());
        if(encryptedPass.equals(user.getPassword())){
            return user;
        }else{
            return null;
        }
    }

    public String deleteById(Long cnp){
        try{
            userRepository.deleteById(cnp);
            return "Success";
        }
        catch (Exception e){
            e.printStackTrace();
            return "Failed";
        }
    }

    public User saveUser(User user){
        return userRepository.save(user);
    }

}
