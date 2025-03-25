# Video Call Enhancement Features - One Pager

## 🪟 Overview 

This project aims to enhance VoIP video calls by introducing the following three features: 

- **Background Replacement**: Users can change their background before or during a video call, including blur, preset backgrounds, and custom images. 
- **Emoji Avatar**: Users can replace their avatar with an Emoji or virtual character for added fun. 
- **Filters**: Users can apply different filters (e.g., beauty, black and white, retro) to enhance video appearance. 

## 🛸 Problem 

- Users want to personalize their appearance and background in video calls to improve engagement. 
- Current VoIP solutions lack flexible background replacement and real-time avatar effects. 
- Users need the ability to adjust backgrounds or apply filters in various settings (home, office) to enhance professionalism or entertainment. 

## 🎯 Objectives 

- Allow users to replace their background before or during video calls (blur, preset, custom). 
- Enable users to change their avatar to an Emoji or virtual character. 
- Provide multiple filter effects, such as beauty, black and white, and retro. 
- Ensure low latency and high visual quality while optimizing performance for low-end devices. 

## 🚧 Constraints 

- Only available for video calls; voice calls do not support this feature. 
- AI processing must be done on-device for privacy and low latency. 
- Algorithm optimization is required to support low-end devices with minimal performance impact. 

## 💁 Customer Persona 

**Persona 1: Business Users**
- 📌 Need: Use professional backgrounds during remote meetings to improve appearance and privacy. 

**Persona 2: Young Social Users**
- 📌 Need: Enhance video call fun by using Emoji avatars or filters. 

**Persona 3: Content Creators**
- 📌 Need: Optimize video quality and personalize appearance through filters and effects. 

## 🧳 Use Cases 

- 📌 **Scenario 1**: A user in a home office replaces their background with a "professional office" setting for a video meeting. 
- 📌 **Scenario 2**: A social user applies an Emoji avatar during a video call for a fun interaction. 
- 📌 **Scenario 3**: A content creator uses filters to enhance video quality or create a specific aesthetic. 

## 📄 PRD 

### ↗️ Features In 

| Feature | Details |
|---------|---------|
| **Background Replacement** | **Given**: The user is in a video call (pre-call or in-call)<br>**When**: The user clicks the "Background" button<br>**Then**: The user can choose a blurred, preset, or custom image as their background, which applies in real-time. |
| **Emoji Avatar** | **Given**: The user is in a video call (pre-call or in-call)<br>**When**: The user selects an Emoji avatar<br>**Then**: The user's video avatar is replaced with the selected Emoji or virtual character in real time. |
| **Filters** | **Given**: The user is in a video call (pre-call or in-call)<br>**When**: The user selects a filter effect<br>**Then**: The chosen filter is applied to the video feed, and the user can adjust its intensity in real time. |

### 📤 Features Out 

- ❌ Avatar effects for voice calls. 
- ❌ Cloud-based processing (all effects are processed on-device). 
- ❌ Advanced 3D AR effects (planned for future iterations). 