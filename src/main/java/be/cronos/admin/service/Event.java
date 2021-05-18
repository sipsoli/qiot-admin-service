package be.cronos.admin.service;

import io.quarkus.runtime.annotations.RegisterForReflection;
import lombok.Getter;
import java.util.UUID;

@Getter
@RegisterForReflection
public class Event {

    private final String id;
    private final String action;
    private String payload;

    public Event(String action) {
        this.id = UUID.randomUUID().toString();
        this.action = action;
    }

    public Event(String action, String payload) {
        this(action);
        this.payload = payload;
    }

}
