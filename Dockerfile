# Node.js 버전을 지정
FROM node:20.11

# 애플리케이션 디렉토리를 생성
WORKDIR /usr/src/app

# package.json과 package-lock.json 파일 복사
COPY package*.json ./

# 프로덕션 의존성만 설치
# 개발 의존성이 필요한 경우, --only=development 플래그를 추가
RUN npm install --only=production && npm install typescript --save-dev 

# 나머지 애플리케이션 소스 코드를 이미지로 복사
COPY . .

# TypeScript 파일을 JavaScript로 컴파일
# 이 단계는 프로젝트가 TypeScript를 사용하는 경우에만 필요합니다.
RUN npx tsc

# 프로젝트를 빌드
RUN npm run build

# 애플리케이션을 실행할 포트를 지정
EXPOSE 3000

# 애플리케이션 시작
CMD ["npm", "run", "start"]
