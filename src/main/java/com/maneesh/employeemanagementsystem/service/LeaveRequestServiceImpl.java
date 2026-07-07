package com.maneesh.employeemanagementsystem.service;

import com.maneesh.employeemanagementsystem.model.LeaveRequest;
import com.maneesh.employeemanagementsystem.repo.LeaveRequestRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeaveRequestServiceImpl implements LeaveRequestService {

    private final LeaveRequestRepository leaveRequestRepository;

    public LeaveRequestServiceImpl(
            LeaveRequestRepository leaveRequestRepository) {
        this.leaveRequestRepository = leaveRequestRepository;
    }

    @Override
    public List<LeaveRequest> getAllLeaveRequests() {
        return leaveRequestRepository.findAll();
    }

    @Override
    public LeaveRequest saveLeaveRequest(
            LeaveRequest leaveRequest) {

        leaveRequest.setStatus("PENDING");

        return leaveRequestRepository.save(leaveRequest);
    }

    @Override
    public LeaveRequest getLeaveRequestById(Long id) {
        return leaveRequestRepository.findById(id).orElse(null);
    }

    @Override
    public LeaveRequest updateLeaveRequest(
            Long id,
            LeaveRequest leaveRequest) {

        LeaveRequest existingLeaveRequest =
                leaveRequestRepository.findById(id).orElse(null);

        if (existingLeaveRequest != null) {

            existingLeaveRequest.setReason(
                    leaveRequest.getReason());

            existingLeaveRequest.setStatus(
                    leaveRequest.getStatus());

            existingLeaveRequest.setEmployee(
                    leaveRequest.getEmployee());

            existingLeaveRequest.setStartDate(
                    leaveRequest.getStartDate());

            existingLeaveRequest.setEndDate(
                    leaveRequest.getEndDate());

            return leaveRequestRepository.save(
                    existingLeaveRequest);
        }

        return null;
    }

    @Override
    public void deleteLeaveRequest(Long id) {
        leaveRequestRepository.deleteById(id);
    }
}