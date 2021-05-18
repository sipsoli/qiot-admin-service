# qiot-admin-service project

Application which'll run on Openshift where an administrator can access a dashboard, 
to view some inforamtion about the measurement stations deployed. The application'll expose some websocket endpoints where
the measurement station can send and retreive information.

## Running the application in dev mode
```shell script
mvn clean compile -Dui.dev quarkus:dev -Dquarkus.http.host=0.0.0.0
--> serves traffic on http://localhost:8081 (without live coding)
```

setting up the proxy to have live angular coding
```shell script
cd webapp
yarn proxy
--> serves traffic on http://localhost:4200
```

Used following tutoriatl to integrate with angularjs: https://quarkus.io/blog/quarkus-and-web-ui-development-mode/

> **_NOTE:_**  Quarkus now ships with a Dev UI, which is available in dev mode only at http://localhost:8080/q/dev/.

## Packaging and running the application

The application can be packaged using:
```shell script
./mvnw package
```
It produces the `quarkus-run.jar` file in the `target/quarkus-app/` directory.
Be aware that it’s not an _über-jar_ as the dependencies are copied into the `target/quarkus-app/lib/` directory.

If you want to build an _über-jar_, execute the following command:
```shell script
./mvnw package -Dquarkus.package.type=uber-jar
```

The application is now runnable using `java -jar target/quarkus-app/quarkus-run.jar`.

## Creating a native executable

You can create a native executable using: 
```shell script
./mvnw package -Pnative
```

Or, if you don't have GraalVM installed, you can run the native executable build in a container using: 
```shell script
./mvnw package -Pnative -Dquarkus.native.container-build=true
```

You can then execute your native executable with: `./target/qiot-admin-service-1.0.0-SNAPSHOT-runner`

If you want to learn more about building native executables, please consult https://quarkus.io/guides/maven-tooling.html.

## Related guides

- WebSockets ([guide](https://quarkus.io/guides/websockets)): WebSocket communication channel support

