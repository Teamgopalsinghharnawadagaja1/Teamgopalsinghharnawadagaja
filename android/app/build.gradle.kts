plugins {
    id("com.android.application")
}

android {
    namespace = "com.teamgopalsingh.app"
    compileSdk = 36

    defaultConfig {
        applicationId = "com.teamgopalsingh.app"
        minSdk = 24
        targetSdk = 36
        versionCode = 1
        versionName = "1.0"
    }

    signingConfigs {
        getByName("debug") {
            storeFile = file("../debug.keystore")
            storePassword = "android"
            keyAlias = "androiddebugkey"
            keyPassword = "android"
        }
    }

    buildTypes {
        getByName("debug") {
            signingConfig = signingConfigs.getByName("debug")
        }
        getByName("release") {
            isMinifyEnabled = false
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
}

dependencies {
    implementation("androidx.appcompat:appcompat:1.7.0")
    implementation("androidx.webkit:webkit:1.12.1")
}

// ---------------------------------------------------------------------------
// Bundle the web client (../client, built with Vite) as offline WebView
// assets. This runs `npm install && npm run build` inside client/ and copies
// the resulting client/dist into app/src/main/assets/www before every build,
// so the APK always ships the current web app. Requires Node.js/npm to be
// available on the machine running Gradle (present by default on
// GitHub-hosted ubuntu-latest runners).
// ---------------------------------------------------------------------------
val clientDir = File(rootDir, "../client")
val webAssetsDir = File(projectDir, "src/main/assets/www")

tasks.register<Exec>("npmInstallClient") {
    onlyIf { clientDir.exists() }
    workingDir = clientDir
    commandLine("bash", "-c", "npm install")
}

tasks.register<Exec>("npmBuildClient") {
    dependsOn("npmInstallClient")
    onlyIf { clientDir.exists() }
    workingDir = clientDir
    commandLine("bash", "-c", "npm run build")
}

tasks.register<Delete>("cleanWebAssets") {
    delete(webAssetsDir)
}

tasks.register<Copy>("copyWebAssets") {
    dependsOn("npmBuildClient", "cleanWebAssets")
    from(File(clientDir, "dist"))
    into(webAssetsDir)
}

tasks.named("preBuild") {
    dependsOn("copyWebAssets")
}
