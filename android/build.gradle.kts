// Top-level build file - plugin versions declared here, applied per-module.
// AGP version must track the Gradle version the CI workflow installs
// (currently Gradle 9.3.1) - AGP has a hard minimum-Gradle-version
// requirement from AGP 9.0 onwards, and it must be <= the installed Gradle
// version (AGP 9.3.0, for example, needs Gradle >= 9.5.0). 9.1.1's minimum
// (Gradle 9.1.0) is satisfied by Gradle 9.3.1.
plugins {
    id("com.android.application") version "9.1.1" apply false
}
