# 📱 MoEngage Integration - PRD

## 🌟 Overview

MoEngage Integration is a comprehensive engagement platform implementation project designed to enhance user engagement and push notification capabilities for BOTIM. The integration will focus specifically on UAE users, adhering to contract limitations of 12 million Monthly Active Users. MoEngage will be used for user engagement, push notifications, and personalized content delivery, providing a robust system for tracking events, sending notifications, delivering custom cards, and triggering API calls.

## 🔄 System Architecture

The diagram below illustrates the integration architecture between BOTIM and MoEngage, showing data flows and key component interactions:

![MoEngage System Flow](../assets/images/moengage.png)

**Key Interactions:**
- Botim Service sends events to Amplitude for analytics and user tracking
- Amplitude processes user data and forwards tracking data to MoEngage
- MoEngage enables personalized communications through push notifications, SMS, email, and custom cards
- MoEngage can trigger BOTIM Open API calls and export user cohorts to Botim CRM Admin
- The system handles promotions and rewards for targeted user engagement

## 🚀 Problem

Currently, BOTIM lacks a sophisticated engagement platform to effectively communicate with users through push notifications and personalized content. Additionally, the platform needs a way to optimize costs by targeting specific geographical regions while providing enhanced engagement features. Without this integration, BOTIM is limited in its ability to engage users with timely and relevant communications, track user interactions, and deliver personalized content experiences.

## 🎯 Objectives

- **Targeted User Engagement** – Implement a system that only initializes the MoEngage SDK for UAE users (with phone numbers starting with "971" or UAE IP addresses) to optimize costs and meet contract limitations.
- **Enhanced Push Notifications** – Enable BOTIM to send rich push notifications to users through MoEngage's delivery system.
- **Personalized Content Delivery** – Implement a custom card delivery system that sends data to be rendered by the client application for a personalized experience.
- **API Integration** – Establish a workflow where MoEngage can trigger BOTIM Open API calls to perform specific actions, particularly for VIP/member-related communications.

## 🚧 Constraints

- **MAU Limitations** – The current MoEngage contract limits usage to 12 million Monthly Active Users.
- **Geographic Targeting** – SDK must only be initialized for UAE region users to optimize costs and comply with contract limitations.
- **Security Requirements** – All communications between systems must be encrypted with API keys and tokens securely stored.
- **Performance Impact** – SDK initialization should not significantly impact app startup time, and event tracking should be non-blocking.

## 💁 Target Users

| User Type | Characteristics |
|-----------|----------------|
| 🇦🇪 **UAE Users** | - Phone numbers starting with "971" (UAE country code)<br>- IP addresses from the UAE region<br>- Primary targets for all MoEngage SDK functionality |
| 👑 **VIP/Premium Members** | - Will receive special communications through the BOTIM Open API<br>- Target audience for exclusive content and membership notifications |
| 👤 **Regular BOTIM Users** | - Will receive general push notifications and content cards<br>- User events and behaviors will be tracked for improved engagement |

## 🧳 Use Cases

### 📊 Direct Event Tracking
**Given:** User performs an action in the app  
**When:** The action is recognized as a trackable event  
**Then:** The event is sent to MoEngage with relevant properties  

The application will track user events and activities directly through MoEngage, including user interactions, behavior, and profile attributes.

### 🔔 Push Notification via BOTIM
**Given:** A notification needs to be sent to a user  
**When:** MoEngage sends a push notification to BOTIM servers  
**Then:** BOTIM forwards the notification to the end user  

MoEngage will send push notifications to users through BOTIM's delivery system, supporting different notification types and targeting specific user segments.

### 🎴 Custom Card Delivery
**Given:** Personalized content needs to be delivered to a user  
**When:** MoEngage sends custom card data  
**Then:** The client app renders the card according to its type and metadata  

MoEngage will send custom card data to users, which will be rendered by the client application according to standard JSON schema and various card types.

### 🔄 BOTIM Open API Integration
**Given:** A specific action needs to be triggered for a user  
**When:** MoEngage campaign triggers an API call to BOTIM Open API  
**Then:** The API performs the requested action  

Initial implementation will focus on VIP/member-related communications, with a flexible architecture for adding more API endpoints in the future.

## 🔧 Technical Implementation

### 🔄 SDK Integration
- MoEngage SDK must be conditionally initialized based on user criteria (UAE region)
- SDK initialization should happen early in the app lifecycle
- SDK configuration must be environment-specific (dev, staging, production)
- Implementation should ensure minimal impact on app startup time

### 👤 User Identification
- Users must be uniquely identified in MoEngage
- User identifiers should be consistent across app reinstalls
- Support for anonymous to known user transitions
- User attributes should be mapped to MoEngage user profile

### 🔒 Security Considerations
- All communications between systems must be encrypted
- API keys and authentication tokens must be securely stored
- Personal user data must be handled according to privacy regulations
- Authentication between MoEngage and BOTIM API must be secure

## 📋 Implementation Phases

| Phase | Description | Deliverables |
|-------|-------------|--------------|
| **Phase 1** | Basic SDK Integration and UAE Targeting | - SDK integration with UAE user filtering<br>- Basic event tracking implementation<br>- User attribute mapping |
| **Phase 2** | Push Notification via BOTIM | - MoEngage to BOTIM push notification flow<br>- Notification targeting capabilities<br>- Notification analytics |
| **Phase 3** | Custom Card Implementation | - Card data structure definition<br>- Client-side rendering implementation<br>- Card targeting and personalization |
| **Phase 4** | BOTIM Open API Integration | - API call flow implementation<br>- VIP/member communication functionality<br>- Testing and validation of end-to-end process |

## 📅 Timeline

| Date | Milestone | Description |
|------|-----------|-------------|
| **April 10** | MoEngage SDK Integration Begins | Start of SDK integration process with UAE user targeting |
| **April 20** | International Remittance Events (Pending) | Begin tracking events related to international money transfer functionality - *Implementation date pending confirmation* |
| **May 15** | All Scenarios Completion | All user flow scenarios must be implemented and validated by mid May, including:<br>- User identification and SDK initialization based on UAE criteria<br>- Basic event tracking for key user interactions<br>- Push notification delivery from MoEngage to BOTIM users<br>- Custom card rendering in the client application<br>- Initial BOTIM Open API integration for VIP/member communications<br>- End-to-end testing of all implemented flows |
| **June 30** | Full Event Implementation | Complete integration of all remaining events across all application features |

## 🧪 Testing Requirements

### 🎯 UAE User Targeting Testing
- Test SDK initialization with UAE and non-UAE phone numbers
- Test SDK initialization with UAE and non-UAE IP addresses
- Verify that non-UAE users do not contribute to MAU count

### 🔄 Functional Testing
- Verify all event tracking scenarios
- Test push notification delivery flow
- Validate custom card rendering in various device conditions
- Test BOTIM Open API integration with various parameters

### ⚡ Performance Testing
- Measure impact of SDK on app startup time
- Test notification delivery times under various network conditions
- Assess card rendering performance on low-end devices

## 📊 Success Metrics

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| **SDK Integration Rate** | ≥ 95% of UAE users | Compare UAE user count vs. MoEngage initialized users |
| **Push Notification Delivery Rate** | ≥ 90% | MoEngage analytics dashboard |
| **Push Notification Open Rate** | ≥ 15% | MoEngage analytics dashboard |
| **Custom Card Render Success** | ≥ 98% | Client-side tracking of render success/failure |
| **BOTIM API Call Success Rate** | ≥ 99% | API call success logs |

## 📝 Glossary

| Term | Definition |
|------|------------|
| **MAU** | Monthly Active Users. The number of unique users who interact with the app in a 30-day period. |
| **MoEngage** | A customer engagement platform that helps companies engage their customers across channels. |
| **BOTIM** | Our application platform that will integrate with MoEngage. |
| **Custom Card** | Structured content that is sent to users and rendered by the client application according to specified templates. |
| **Open API** | A publicly available application programming interface that provides access to software applications or web services. |

---

Document Version: 1.0  
Last Updated: 2023-04-03 