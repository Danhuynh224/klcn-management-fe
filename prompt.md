# FRONTEND SPEC - Hệ thống đăng ký BCTT / KLTN

## Tech stack

- ReactJS
- TypeScript
- Vite
- React Router
- Axios
- TanStack Query
- Zustand hoặc Context cho auth
- React Hook Form
- Zod
- Ant Design

---

## 1. Mục tiêu frontend

Frontend phải có giao diện đầy đủ cho:

- Sinh viên
- Giảng viên
- Trưởng bộ môn

Frontend phải trình bày rõ workflow:

- đăng ký
- duyệt
- nộp hồ sơ
- chấm điểm
- hội đồng
- hậu bảo vệ

Ưu tiên:

- giao diện sạch, rõ role
- demo được từ đầu đến cuối
- form dễ dùng
- bảng rõ ràng
- có timeline trạng thái
- có upload file
- có xem điểm và biên bản

---

## 2. Kiến trúc frontend

### 2.1 Thư viện bắt buộc

- react-router-dom
- axios
- @tanstack/react-query
- react-hook-form
- zod
- antd

### 2.2 Cấu trúc thư mục

src/
main.tsx
App.tsx
app/
router.tsx
providers.tsx
layouts/
AuthLayout.tsx
DashboardLayout.tsx
pages/
auth/
LoginPage.tsx
student/
DashboardPage.tsx
ProfilePage.tsx
RegisterBcttPage.tsx
RegisterKltnPage.tsx
StatusPage.tsx
SubmissionPage.tsx
ResultPage.tsx
lecturer/
DashboardPage.tsx
SupervisorPage.tsx
ReviewerPage.tsx
CommitteePage.tsx
ChairPage.tsx
SecretaryPage.tsx
TopicSuggestionPage.tsx
head/
DashboardPage.tsx
QuotaPage.tsx
AssignReviewerPage.tsx
AssignCommitteePage.tsx
StatisticsPage.tsx
components/
common/
forms/
tables/
uploads/
timeline/
status/
notifications/
services/
api.ts
auth.api.ts
users.api.ts
quotas.api.ts
terms.api.ts
registrations.api.ts
documents.api.ts
scores.api.ts
committees.api.ts
notifications.api.ts
dashboards.api.ts
store/
auth.store.ts
hooks/
types/
utils/

---

## 3. Auth flow

### 3.1 Login flow

- User vào LoginPage
- nhập email/password
- submit gọi POST /auth/login
- lưu accessToken
- lưu user info vào auth store
- redirect theo role:
  - STUDENT -> /student/dashboard
  - LECTURER -> /lecturer/dashboard
  - HEAD_OF_DEPARTMENT -> /head/dashboard

### 3.2 Protected route

- Nếu không có token -> redirect login
- Nếu role không đúng -> redirect dashboard phù hợp hoặc unauthorized page

### 3.3 Auth store

Lưu:

- token
- user
- isAuthenticated

Methods:

- login
- logout
- setUser
- clearAuth

---

## 4. Layout

### 4.1 AuthLayout

- dùng cho trang login
- chính giữa màn hình
- tối giản

### 4.2 DashboardLayout

Bao gồm:

- sidebar trái
- header trên
- breadcrumb
- content area
- notification bell
- user dropdown

Sidebar thay đổi theo role.

---

## 5. Sidebar theo vai trò

### 5.1 Student sidebar

- Dashboard
- Thông tin chung
- Đăng ký BCTT
- Đăng ký KLTN
- Theo dõi trạng thái
- Nộp hồ sơ
- Kết quả / Bảo vệ

### 5.2 Lecturer sidebar

- Dashboard
- Hướng dẫn
- Phản biện
- Hội đồng
- Chủ tịch
- Thư ký
- Gợi ý đề tài

### 5.3 Head sidebar

- Dashboard
- Quota GV
- Phân công phản biện
- Phân công hội đồng
- Thống kê

---

## 6. Dữ liệu frontend cần quản lý

### 6.1 Global state

- auth
- notification unread count

### 6.2 Server state

Dùng TanStack Query cho:

- current user
- lecturers list
- quotas
- terms
- registrations
- documents
- scores
- committees
- notifications
- dashboard summaries

### 6.3 Form state

Dùng React Hook Form + Zod cho:

- login
- đăng ký BCTT
- đăng ký KLTN
- nhập điểm
- tạo hội đồng
- phân công phản biện
- phân công hội đồng

---

## 7. Service layer và API client

### 7.1 api.ts

- tạo axios instance
- set baseURL
- interceptor gắn Bearer token
- interceptor xử lý lỗi 401

### 7.2 auth.api.ts

Functions:

- login(payload)
- getMe()

### 7.3 users.api.ts

- getLecturers(params)
- getStudents(params)
- getProfile()

### 7.4 quotas.api.ts

- getQuotas(params)
- updateQuota(id, payload)
- approveQuota(id)

### 7.5 terms.api.ts

- getTerms(params)
- createTerm(payload)
- updateTerm(id, payload)

### 7.6 registrations.api.ts

- createBctt(payload)
- createKltn(payload)
- getMyRegistrations()
- getRegistrations(params)
- getRegistrationDetail(id)
- approveRegistration(id, payload)
- rejectRegistration(id, payload)
- changeSupervisor(id, payload)
- changeReviewer(id, payload)
- updateStatus(id, payload)

### 7.7 documents.api.ts

- uploadDocument(formData)
- getDocumentsByRegistration(registrationId)

### 7.8 scores.api.ts

- createScore(payload)
- updateScore(id, payload)
- getScoresByRegistration(registrationId)
- finalizeScore(registrationId, payload)

### 7.9 committees.api.ts

- getCommittees(params)
- createCommittee(payload)
- updateCommittee(id, payload)
- assignRegistration(committeeId, payload)

### 7.10 notifications.api.ts

- getMyNotifications(params)
- markNotificationRead(id)

### 7.11 dashboards.api.ts

- getStudentDashboard()
- getLecturerDashboard()
- getHeadDashboard()

---

## 8. Trang chi tiết theo vai trò

# 8.1 Student Pages

## 8.1.1 Student DashboardPage

### Mục tiêu

Hiển thị nhanh:

- thông tin SV
- registration hiện tại
- trạng thái hiện tại
- deadline gần nhất
- notification mới
- shortcut đến đăng ký / nộp bài

### UI sections

- Profile summary card
- Current registration card
- Timeline trạng thái
- Deadline card
- Notifications list

### APIs dùng

- GET /dashboards/student
- GET /notifications/me

---

## 8.1.2 Student ProfilePage

### Mục tiêu

Hiển thị:

- MSSV
- họ tên
- email
- role
- lịch sử registration

### APIs dùng

- GET /users/me
- GET /registrations/me

---

## 8.1.3 Student RegisterBcttPage

### Mục tiêu

Cho SV đăng ký BCTT

### Form fields

- tên đề tài
- lĩnh vực
- công ty
- giảng viên hướng dẫn
- đợt

### Hành vi

- khi chọn lĩnh vực -> gọi lecturers API với filter field
- chỉ hiện các đợt BCTT đang active
- submit gọi POST /registrations/bctt
- success -> toast + redirect status page

### Validation

- bắt buộc tên đề tài
- bắt buộc lĩnh vực
- bắt buộc GVHD
- bắt buộc đợt

### APIs dùng

- GET /terms?loai=BCTT&isActive=true
- GET /users/lecturers?fieldName=...
- POST /registrations/bctt

---

## 8.1.4 Student RegisterKltnPage

### Mục tiêu

Cho SV đăng ký KLTN nếu đủ điều kiện

### Hành vi

- trước khi render form nên fetch registrations me để kiểm tra có BCTT_PASSED chưa
- nếu chưa đủ điều kiện -> hiển thị cảnh báo và disable form
- có thể prefill GVHD từ BCTT đã pass gần nhất

### APIs dùng

- GET /registrations/me
- GET /terms?loai=KLTN&isActive=true
- GET /users/lecturers?fieldName=...
- POST /registrations/kltn

---

## 8.1.5 Student StatusPage

### Mục tiêu

Hiển thị timeline trạng thái và toàn bộ quá trình

### UI

- chọn registration nếu có nhiều registration
- timeline component
- current status tag
- info card: đề tài, GVHD, GVPB, hội đồng
- approvals card: supervisorApproved, chairApproved

### APIs dùng

- GET /registrations/me
- GET /registrations/:id
- GET /documents/registration/:id
- GET /scores/registration/:id

---

## 8.1.6 Student SubmissionPage

### Mục tiêu

SV upload hồ sơ đúng giai đoạn

### Các loại upload

- BCTT_REPORT
- INTERNSHIP_CONFIRMATION
- KLTN_REPORT
- REVISED_THESIS
- REVISION_EXPLANATION

### Hành vi

- chỉ hiện loại upload phù hợp với trạng thái hiện tại
- upload xong refresh document list
- có link xem file

### APIs dùng

- GET /registrations/me
- GET /documents/registration/:registrationId
- POST /documents/upload

---

## 8.1.7 Student ResultPage

### Mục tiêu

Hiển thị:

- lịch bảo vệ
- địa điểm
- điểm thành phần
- điểm final
- biên bản hội đồng
- trạng thái duyệt chỉnh sửa

### APIs dùng

- GET /registrations/:id
- GET /scores/registration/:id
- GET /documents/registration/:id
- GET /minutes/registration/:id

---

# 8.2 Lecturer Pages

## 8.2.1 Lecturer DashboardPage

### Hiển thị

- số SV hướng dẫn
- số SV phản biện
- số hội đồng
- task cần xử lý

### APIs

- GET /dashboards/lecturer

---

## 8.2.2 SupervisorPage

### Mục tiêu

GVHD duyệt và theo dõi SV hướng dẫn

### Tabs gợi ý

- Chờ duyệt
- Đang thực hiện
- Chờ chấm
- Sau bảo vệ

### Bảng dữ liệu

Columns:

- tên SV
- MSSV
- tên đề tài
- loại
- đợt
- trạng thái
- file bài
- action

### Actions

- approve registration
- reject registration
- edit topic title
- upload Turnitin
- nhập điểm supervisor
- duyệt chỉnh sửa

### APIs

- GET /registrations?roleView=supervisor
- PATCH /registrations/:id/approve
- PATCH /registrations/:id/reject
- POST /documents/upload
- POST /scores
- PATCH /scores/:id
- PATCH /registrations/:id/update-status

---

## 8.2.3 ReviewerPage

### Mục tiêu

GVPB xem danh sách được phân công và chấm

### Bảng dữ liệu

- tên SV
- đề tài
- file bài
- file Turnitin
- trạng thái
- action nhập điểm

### Form phản biện

- score1
- score2
- score3
- totalScore
- comments
- questions

### APIs

- GET /registrations?roleView=reviewer
- GET /documents/registration/:id
- POST /scores
- PATCH /scores/:id

---

## 8.2.4 CommitteePage

### Mục tiêu

Giảng viên hội đồng xem SV trong hội đồng và nhập điểm

### Bảng dữ liệu

- tên SV
- đề tài
- hội đồng
- ngày bảo vệ
- địa điểm
- bài nộp
- Turnitin
- action nhập điểm

### APIs

- GET /registrations?roleView=committee
- GET /documents/registration/:id
- POST /scores
- PATCH /scores/:id

---

## 8.2.5 ChairPage

### Mục tiêu

Chủ tịch hội đồng duyệt chỉnh sửa sau khi GVHD đã duyệt

### Bảng dữ liệu

- tên SV
- đề tài
- biên bản hội đồng
- bài chỉnh sửa
- giải trình chỉnh sửa
- supervisorApproved
- chairApproved
- action approve/reject

### Business UI rules

- nếu supervisorApproved != true thì disable nút duyệt của Chủ tịch

### APIs

- GET /registrations?roleView=chair
- GET /documents/registration/:id
- PATCH /registrations/:id/update-status hoặc API approve revision riêng nếu BE có tách

---

## 8.2.6 SecretaryPage

### Mục tiêu

Thư ký tổng hợp điểm và biên bản hội đồng

### Bảng dữ liệu

- tên SV
- đề tài
- các điểm thành phần
- final score
- biên bản

### Actions

- xem scores
- finalize score
- generate minutes
- update minutes

### APIs

- GET /registrations?roleView=secretary
- GET /scores/registration/:id
- POST /scores/registration/:id/finalize
- POST /minutes/registration/:id/generate
- PATCH /minutes/:registrationId
- GET /minutes/registration/:id

---

## 8.2.7 TopicSuggestionPage

### Mục tiêu

GV quản lý đề tài gợi ý

### Chức năng

- tạo đề tài gợi ý
- sửa
- mở/đóng status

### APIs

- GET /topic-suggestions
- POST /topic-suggestions
- PATCH /topic-suggestions/:id

Nếu backend chưa tách module này, có thể dùng Detaigoiy qua users/registrations extension.

---

# 8.3 Head Pages

## 8.3.1 Head DashboardPage

### Hiển thị

- tổng số registrations theo đợt
- số chờ duyệt
- số chờ phân công reviewer
- số chờ phân công hội đồng
- quota overview

### APIs

- GET /dashboards/head

---

## 8.3.2 QuotaPage

### Mục tiêu

TBM xem quota GV, chỉnh quota, duyệt quota

### Bảng dữ liệu

- GV
- quota
- usedSlots
- remainingSlots
- đợt
- action edit/approve

### APIs

- GET /quotas
- PATCH /quotas/:id
- PATCH /quotas/:id/approve

---

## 8.3.3 AssignReviewerPage

### Mục tiêu

TBM phân công phản biện

### Bảng dữ liệu

- tên SV
- đề tài
- GVHD
- đợt
- trạng thái
- dropdown chọn GVPB

### Hành vi

- fetch lecturers
- save phân công theo từng row hoặc batch

### APIs

- GET /registrations?loai=KLTN
- GET /users/lecturers
- PATCH /registrations/:id/change-reviewer

---

## 8.3.4 AssignCommitteePage

### Mục tiêu

TBM tạo hội đồng và phân SV vào hội đồng

### UI chia 2 phần

Phần 1:

- form tạo hội đồng

Phần 2:

- bảng registrations KLTN
- dropdown chọn committee
- assign

### APIs

- GET /committees
- POST /committees
- PATCH /committees/:id
- GET /registrations?loai=KLTN
- POST /committees/:id/assign-registration

---

## 8.3.5 StatisticsPage

### Mục tiêu

Hiển thị thống kê:

- điểm toàn bộ SV theo đợt
- pass / fail
- trạng thái duyệt chỉnh sửa của GVHD / Chủ tịch

### UI

- filter theo đợt
- summary cards
- bảng chi tiết
- có thể có chart đơn giản

### APIs

- GET /registrations
- GET /scores/registration/:id
- GET /dashboards/head

---

## 9. Components dùng chung

### 9.1 StatusTag

- nhận status string
- map màu và label
- dùng khắp hệ thống

### 9.2 TimelineStatus

- render timeline từ danh sách trạng thái
- dùng ở StatusPage

### 9.3 RegistrationTable

- bảng reusable cho các màn hình GV/TBM
- props:
  - data
  - columns mode
  - actions render

### 9.4 FileUploadCard

- chọn file
- validate extension
- submit upload
- hiển thị file list hiện có

### 9.5 ScoreForm

- form nhập điểm
- comments
- questions
- reusable cho supervisor/reviewer/committee

### 9.6 CommitteeCard

- hiển thị hội đồng
- chủ tịch
- thư ký
- thành viên
- địa điểm
- ngày bảo vệ

### 9.7 NotificationBell

- dropdown thông báo
- unread count
- mark as read

---

## 10. Query keys gợi ý

- ['me']
- ['lecturers', params]
- ['students', params]
- ['terms', params]
- ['quotas', params]
- ['registrations', params]
- ['registration', id]
- ['documents', registrationId]
- ['scores', registrationId]
- ['committees', params]
- ['notifications', params]
- ['dashboard', role]

---

## 11. UX rules quan trọng

### 11.1 Feedback

- mọi action phải có toast success/error
- loading buttons khi submit
- skeleton hoặc spin khi load page

### 11.2 Form rules

- disable submit nếu invalid
- show error rõ ràng
- prefill khi có data sẵn

### 11.3 Permission-based UI

- không hiện nút hành động nếu role không phù hợp
- không cho click nếu trạng thái chưa phù hợp

### 11.4 Status-driven UI

- Student không thấy form KLTN nếu chưa pass BCTT
- Chair không duyệt nếu supervisorApproved chưa true
- Upload chỉ hiện khi status và thời gian hợp lệ

---

## 12. Response mapping frontend

Frontend giả định tất cả API trả format:
{
"success": true,
"message": "optional",
"data": ...
}

Frontend phải có util parse lỗi và hiển thị message từ backend.

---

## 13. Definition of done for frontend

Frontend hoàn thành khi:

- login theo role chạy được
- sidebar theo role đúng
- student đăng ký BCTT được
- lecturer duyệt được
- student upload hồ sơ được
- student đăng ký KLTN được khi đủ điều kiện
- head phân công reviewer được
- head tạo/assign committee được
- lecturer nhập điểm được
- secretary finalize điểm được
- student xem kết quả được
- student upload bài chỉnh sửa được
- supervisor/chair duyệt được đúng thứ tự
- notification hiển thị được
