package be.cronos.admin.service;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.quarkus.runtime.annotations.RegisterForReflection;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
@RegisterForReflection
public class StationStatistics {

    private String instant;
    private Station station;
    private Statistics statistics;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @JsonIgnoreProperties(ignoreUnknown = true)
    @RegisterForReflection
    public static class Station {
        private String id;
        private String serial;
        private String name;
        private Double latitude;
        private Double longitude;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @JsonIgnoreProperties(ignoreUnknown = true)
    @RegisterForReflection
    public static class Statistics {

        private Result gas;
        private Result pollution;

        @Data
        @AllArgsConstructor
        @NoArgsConstructor
        @JsonIgnoreProperties(ignoreUnknown = true)
        @RegisterForReflection
        public static class Result {
            private long successCount;
            private long errorCount;
            private String status;
            private long interval;
        }
    }
}
