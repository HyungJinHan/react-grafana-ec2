# Grafana (ssh)와 React 연동

### 세팅 정보

- AWS EC2 사용

  - OS : `Ubuntu`
  - ssh 접속은 `.pem` 키로 인증

### ID / PW

- ID : `admin`
- PW : `admin`

### 무한 로그인 지옥에 빠졌다면?

> ssh의 `grafana.ini` 경로를 찾아 파일을 열어 설정을 변경해야 함
>
> 경로 : `/etc/grafana/grafana.ini` (ssh의 OS에 따라 다를 수 있음)

```ini
# enable anonymous access
;enabled = false
enabled = true

# set to true if you host Grafana behind HTTPS. default is false.
;cookie_secure = true
cookie_secure = false

# set cookie SameSite attribute. defaults to `lax`. can be set to "lax", "strict", "none" and "disabled"
;cookie_samesite = lax
cookie_samesite = none
```

### `<iframe>` 임베드 설정

```ini
# set to true if you want to allow browsers to render Grafana in a <frame>, <iframe>, <embed> or <object>. default is false.
;allow_embedding = false
allow_embedding = true
```
