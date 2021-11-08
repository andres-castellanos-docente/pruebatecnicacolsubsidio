package com.pruebaandres.banco.responses;

import java.time.LocalDateTime;
import java.util.List;

public class DeleteResponse {
    private Integer responseCode;
    private Integer status;
    private List<String> responseDescription;
    private String timestamp;

    public DeleteResponse() {
    }

    public DeleteResponse(Integer responseCode, List<String> responseDescription) {
        this.responseCode = responseCode;
        this.responseDescription = responseDescription;
    }

    public DeleteResponse(Integer responseCode, List<String> responseDescription, Integer status) {
        setResponseCode(responseCode);
        setResponseDescription(responseDescription);
        setStatus(status);
    }

    public Integer getResponseCode() {
        return responseCode;
    }

    public void setResponseCode(Integer responseCode) {
        this.responseCode = responseCode;
    }

    public List<String> getResponseDescription() {
        return responseDescription;
    }

    public void setResponseDescription(List<String> responseDescription) {
        this.responseDescription = responseDescription;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getTimestamp() {
        return LocalDateTime.now().toString();
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }
}
