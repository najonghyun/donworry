package com.ssafy.donworry.api.service.account.query;

import com.ssafy.donworry.api.controller.account.dto.response.AccountAllResponse;
import com.ssafy.donworry.api.controller.account.dto.response.AccountConsumptionDetailResponse;
import com.ssafy.donworry.api.controller.account.dto.response.AccountHistoryResponse;
import com.ssafy.donworry.api.controller.account.dto.response.AccountSummaryResponse;
import com.ssafy.donworry.domain.account.entity.Account;
import com.ssafy.donworry.domain.account.repository.query.AccountQueryRepository;
import com.ssafy.donworry.domain.finance.entity.Consumption;
import com.ssafy.donworry.domain.finance.repository.ConsumptionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AccountQueryService {
    private final AccountQueryRepository accountQueryRepository;
    private final ConsumptionRepository consumptionRepository;
    public AccountAllResponse searchAccountList(Long memberId) {
        List<Account> list = accountQueryRepository.findByMemberId(memberId);

        AtomicLong total = new AtomicLong(0L);


        List<AccountSummaryResponse> accountSummaryResponses  = list.stream()
                .map(
                        account -> {
                            total.addAndGet(account.getAccountAmount());
                            return AccountSummaryResponse.of(account);
                        })
                .collect(Collectors.toList());

        return AccountAllResponse.of(total.get(), accountSummaryResponses);
    }


    public AccountHistoryResponse searchAccountDetailList(Long accountId) {
        List<Consumption> list = consumptionRepository.findByAccountId(accountId);
        List<AccountConsumptionDetailResponse> accountConsumptionDetailResponses = list.stream()
                .map(
                        consumption -> {
                            return AccountConsumptionDetailResponse.of(consumption);
                        }
                ).collect(Collectors.toList());
        return AccountHistoryResponse.of(accountConsumptionDetailResponses);
    }
}
