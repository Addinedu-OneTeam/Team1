package com.example.service;

import com.example.domain.SnsInfo;
import com.example.domain.User;
import com.example.dto.LoginDto;
import com.example.repository.SnsInfoRepository;
import com.example.oauth2.service.OAuth2UserPrincipal;
import com.example.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Date;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder pEncoder;

    @Autowired
    private SnsInfoRepository snsInfoRepository;

    public User create(User user) {
        user.setPasswordHash(pEncoder.encode(user.getPasswordHash()));
        return userRepository.save(user);
    }

    public User read(Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            return user.get();
        }
        return user.get();
    }

    public User authenticate(LoginDto loginDto) {
        Optional<User> user = userRepository.findByEmail(loginDto.getEmail());
        if (user.isPresent()) {
            if (pEncoder.matches(loginDto.getPassword(), user.get().getPasswordHash())) {
                return user.get();
            }
        }
        return null;
    }

    public boolean isEmailUnique(String email) {
        Optional<User> existingUser = userRepository.findByEmail(email);
        System.out.println("있으니가 가입 불가능 false" + !existingUser.isPresent());
        return !existingUser.isPresent();
    }

    public User passwordUpdate(LoginDto loginDto) {
        Optional<User> user = userRepository.findByEmail(loginDto.getEmail());
        System.out.println(user);
        user.get().setPasswordHash(pEncoder.encode(loginDto.getPassword()));
        return userRepository.save(user.get());
    }

    public User findOrCreateUser(OAuth2UserPrincipal oAuth2UserPrincipal, String registrationId) {
        Optional<User> userOptional = userRepository.findByEmail(oAuth2UserPrincipal.getEmail());
        User user = userOptional.orElseGet(() -> new User());
        if (!userOptional.isPresent()) {
            user.setEmail(oAuth2UserPrincipal.getEmail());
            user.setUsername(oAuth2UserPrincipal.getName());
            // 소셜 로그인 사용자는 비밀번호 설정 없음
            // user.setPasswordHash(null);
//            user.setBirthday()); // 예시로 현재 날짜를 넣었습니다. 실제로는 적절한 값을 설정해야 합니다.
            user.setGender("male"); // SNS에서 제공하지 않으면 'unknown'과 같은 기본값을 설정할 수 있습니다.
            user.setPurpose("개인용"); // 목적 필드에 대해 SNS 로그인으로 설정
            user.setRegisteredAt(LocalDateTime.now());

            // SNS 정보 설정
            SnsInfo snsInfo = new SnsInfo();
            snsInfo.setSnsId(oAuth2UserPrincipal.getUserInfo().getId());
            snsInfo.setSnsType(registrationId);
            snsInfo.setSnsName(oAuth2UserPrincipal.getName());
//            snsInfo.setSnsProfile(oAuth2UserInfo.getImageUrl());
            snsInfo.setSnsConnectDate(new Date());
            snsInfo.setProvider(oAuth2UserPrincipal.getUserInfo().getProvider().name());
            snsInfo.setProviderUserId(oAuth2UserPrincipal.getUserInfo().getId());
            snsInfo.setUser(user);

            user.setSnsInfos(Arrays.asList(snsInfo));
        }
        return userRepository.save(user);
    }

    public void deleteUser(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            userRepository.delete(userOptional.get());
            snsInfoRepository.deleteById(userOptional.get().getUserId());
        }
    }




}
