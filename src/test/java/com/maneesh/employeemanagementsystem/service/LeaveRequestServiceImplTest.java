package com.maneesh.employeemanagementsystem.service;

import com.maneesh.employeemanagementsystem.model.LeaveRequest;
import com.maneesh.employeemanagementsystem.repo.LeaveRequestRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class LeaveRequestServiceImplTest {

    @Mock
    private LeaveRequestRepository leaveRequestRepository;

    @InjectMocks
    private LeaveRequestServiceImpl leaveRequestService;

    @Test
    void shouldReturnAllLeaveRequests() {

        LeaveRequest leaveRequest = new LeaveRequest();
        leaveRequest.setId(1L);

        when(leaveRequestRepository.findAll())
                .thenReturn(List.of(leaveRequest));

        List<LeaveRequest> result =
                leaveRequestService.getAllLeaveRequests();

        assertEquals(1, result.size());
    }

    @Test
    void shouldSaveLeaveRequestWithPendingStatus() {

        LeaveRequest leaveRequest = new LeaveRequest();

        when(leaveRequestRepository.save(any(LeaveRequest.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        LeaveRequest result =
                leaveRequestService.saveLeaveRequest(
                        leaveRequest
                );

        assertEquals(
                "PENDING",
                result.getStatus()
        );
    }

    @Test
    void shouldReturnLeaveRequestById() {

        LeaveRequest leaveRequest = new LeaveRequest();
        leaveRequest.setId(1L);

        when(leaveRequestRepository.findById(1L))
                .thenReturn(Optional.of(leaveRequest));

        LeaveRequest result =
                leaveRequestService.getLeaveRequestById(1L);

        assertNotNull(result);
        assertEquals(1L, result.getId());
    }

    @Test
    void shouldUpdateLeaveRequest() {

        LeaveRequest existing = new LeaveRequest();
        existing.setId(1L);
        existing.setReason("Old Reason");
        existing.setStatus("PENDING");

        LeaveRequest updated = new LeaveRequest();
        updated.setReason("Medical Leave");
        updated.setStatus("APPROVED");

        when(leaveRequestRepository.findById(1L))
                .thenReturn(Optional.of(existing));

        when(leaveRequestRepository.save(any(LeaveRequest.class)))
                .thenReturn(existing);

        LeaveRequest result =
                leaveRequestService.updateLeaveRequest(
                        1L,
                        updated
                );

        assertNotNull(result);

        assertEquals(
                "Medical Leave",
                result.getReason()
        );

        assertEquals(
                "APPROVED",
                result.getStatus()
        );
    }

    @Test
    void shouldDeleteLeaveRequest() {

        leaveRequestService.deleteLeaveRequest(1L);

        verify(
                leaveRequestRepository,
                times(1)
        ).deleteById(1L);
    }
}