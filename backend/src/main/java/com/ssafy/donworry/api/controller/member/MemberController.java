package com.ssafy.donworry.api.controller.member;

import com.ssafy.donworry.api.controller.member.dto.request.MemberJoinRequest;
import com.ssafy.donworry.api.controller.member.dto.request.MemberLoginRequest;
import com.ssafy.donworry.api.controller.member.dto.response.MemberLoginResponse;
import com.ssafy.donworry.api.service.member.MemberService;
import com.ssafy.donworry.api.service.member.query.MemberQueryService;
import com.ssafy.donworry.api.service.member.request.MemberJoinServiceRequest;
import com.ssafy.donworry.api.service.member.request.MemberLoginServiceRequest;
import com.ssafy.donworry.common.model.UserDetailsModel;
import com.ssafy.donworry.common.response.ApiData;
import com.ssafy.donworry.domain.member.repository.query.MemberQueryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final BCryptPasswordEncoder encoder;
    private final MemberQueryService memberQueryService;

    @PostMapping("/join")
    public ApiData<String> joinMember(@RequestBody MemberJoinRequest request){
        memberService.joinMember(MemberJoinServiceRequest.of(request, encoder.encode(request.memberPassword())));

        return ApiData.of("회원가입에 성공했습니다.");
    }

    @PostMapping("/login")
    public ApiData<MemberLoginResponse> loginMember(@RequestBody MemberLoginRequest request){
        return ApiData.of(memberQueryService.loginMember(MemberLoginServiceRequest.of(request)));
    }

    @GetMapping("/logout")
    public ApiData<String> logoutMember(@AuthenticationPrincipal UserDetailsModel model){
        memberQueryService.logoutMember(model.getId());
        return ApiData.of("로그아웃에 성공하였습니다.");
    }
}
