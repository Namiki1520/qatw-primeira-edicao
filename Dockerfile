# Usando a imagem base Playwright
FROM mcr.microsoft.com/playwright:v1.50.1-noble

# Instalando dependências, OpenJDK 21, Node.js e npm
RUN apt-get update && apt-get install -y \
    wget \
    unzip \
    openjdk-21-jdk \
    curl \
    && apt-get clean \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean

# Configurando a variável de ambiente JAVA_HOME
ENV JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64
ENV PATH="${JAVA_HOME}/bin:${PATH}"
