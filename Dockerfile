# Node.js 버전
FROM node:20.11

# 애플리케이션 디렉토리 생성
WORKDIR /usr/src/app

# package.json, package-lock.json 복사
COPY package*.json ./

# 애플리케이션 의존성 설치
RUN npm install

# 나머지 애플리케이션 소스 코드를 컨테이너로 복사
COPY . .

# 빌드 스크립트 실행 
RUN npm run build

EXPOSE 3000

# 애플리케이션 시작
CMD ["npm", "run", "start"]
