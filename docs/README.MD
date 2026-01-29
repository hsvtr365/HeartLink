# Offline Script VN (MeChat-like) — MVP

채팅형 미연시(단일 스토리 + 보석 선택지로 “추가 이벤트”)를 **오프라인 플레이** 중심으로 만드는 MVP 프로젝트.

- AI 연동 없음
- 스킵/되감기/북마크/검색 없음
- 대화 텍스트 로그 저장 없음(선택 이벤트만 저장)
- 캐릭터/에피소드 스크립트는 다운로드 후 오프라인 실행
- 에셋(이미지/오디오)은 평문 파일, 스크립트만 암호화

---

## 목표

1. 사용자가 캐릭터 선택(온라인) → 최신 에피소드/청크를 다운로드
2. 이후 오프라인으로 해당 캐릭터 플레이 가능
3. 스토리는 단일 진행, 보석(유료) 선택지는 “사이드 이벤트”만 보여주고 본선 복귀

---

## Tech Stack

### Client / App
- SvelteKit (CSR 중심)
- Capacitor (iOS / Android)
- TailwindCSS
- Local DB: SQLite

### Backend / API
- Spring Boot 3.x (Java 17+)
- REST API

### Crypto
- AES-256-GCM
- 키 스코프: **episode_version 당 1개 키(A안)**
- nonce(IV): **chunk마다 12 bytes 랜덤(파일에 포함)**

---

## Core Design

### 1) 저장 최소화
- **대화 텍스트를 저장하지 않음**
- **선택 이벤트(choice)만 저장**
- 앱 재실행 시: 선택 이벤트를 스크립트 런타임에 replay 해서 현재 노드까지 복원

### 2) 유료(보석) 선택지 정책
- 메인 스토리는 단일(큰 분기 없음)
- 유료 선택지는 “사이드 이벤트”를 보여준 뒤 **본선으로 복귀**
- 상태 변화는 최소화(원하면 `state_json`에만 반영)

### 3) 업데이트 정책
- 플레이 중인 세이브는 `episode_version` **고정**
- 새로 시작할 때만 최신 버전 사용 (세이브 깨짐 방지)

---

## Local Persistence (SQLite)

### `save_slot`
| column | type | note |
|---|---|---|
| slot_id | TEXT PK | UUID |
| character_id | TEXT | 캐릭터 |
| episode_version | TEXT | 세이브 생성 시 고정 |
| current_node_id | TEXT | 현재 노드 |
| state_json | TEXT | gems / paidSeen 등 최소 상태 |
| updated_at | INTEGER | unix ms |

### `choice_event`
| column | type | note |
|---|---|---|
| slot_id | TEXT | FK 개념 |
| seq | INTEGER | 1..n |
| node_id | TEXT | 선택 발생 노드 |
| choice_id | TEXT | 선택 ID |
| is_paid | INTEGER | 0/1 |
| gem_cost | INTEGER | 비용 |
| ts | INTEGER | unix ms |

- PK: `(slot_id, seq)`
- INDEX: `slot_id`

**state_json 예시**
```json
{
  "gems": 120,
  "paidSeen": {
    "n120:c2": true
  }
}
