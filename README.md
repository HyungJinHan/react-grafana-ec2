# Grafana (ssh)와 React 연동

## 기본 세팅 진행

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

## HTTPS 설정 관련

> 일단 도메인을 따로 구하지도 않은 상태로 진행했음
>
> AWS CloudFront 배포를 위해 설정해보려 했으나 Mixed Content (HTTP와 HTTPS 혼합 사용) 에러로 인해 차트 출력 오류를 수정하기 위해 시도한 방법
>
> ssh 서버(`ubuntu`) 환경에서 진행
>
> https://gist.github.com/woorim960/dda0bc85599f61a025bb8ac471dfaf7a -> 참고 예정
>
> ~~결론 : 뻘짓~~

### 인증서 키 발급

```bash
openssl genrsa -out grafana.key 2032 # -> 해당 Grafana의 PID (다를 수 있음)
```

### ssh 서버(`ubuntu`) 환경에서 `ssl` 인증서 서명 요청

```bash
openssl req -new -key grafana.key -out grafana.csr

# 다음과 같이 출력되는 입력 사항 기입 (예시로 기입한 것)
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) [AU]:KR
State or Province Name (full name) [Some-State]:Jeollanam-do
Locality Name (eg, city) []:Suncheon-si
Organization Name (eg, company) [Internet Widgits Pty Ltd]:test
Organizational Unit Name (eg, section) []:test
Common Name (e.g. server FQDN or YOUR name) []:grafana-test-server
Email Address []:hhj@odn.us

Please enter the following 'extra' attributes
to be sent with your certificate request
A challenge password []:test
An optional company name []:test
```

### 인증서 생성

```bash
openssl x509 -req -days 365 -in grafana.csr -signkey grafana.key -out grafana.crt

# Certificate request self-signature ok
# ubject=C = KR, ST = Jeollanam-do, L = Suncheon-si, O = test, OU = test, CN = grafana-test-server, # emailAddress = hhj@odn.us
```

### `grafana.ini` 수정

```ini
[server]
# Protocol (http, https, h2, socket)
;protocol = http
protocol = https

# https certs & key file
;cert_file =
cert_file = /저장된/crt/경로/grafana.crt
;cert_key =
cert_key = /저장된/key/경로/grafana.key
```

### 결론

<span style="background-color: #FF0000; color: black; padding-left: 5px; padding-right: 5px; font-size: 15px">**~~개같이 멸망~~**</span>

### AWS Managed Grafana (인증 필요)

> 추가적으로 iframe embed 가능 여부 체크 진행 중

- IAM 사용자로 추가되어 있어야 인증이 가능

  - 현재 필자만 추가되어 있음

**[📑 ODN Dashboard](https://g-fd23aacbb5.grafana-workspace.us-east-1.amazonaws.com/d/SSqT0dNIz/odn-dashboard?orgId=1)**
