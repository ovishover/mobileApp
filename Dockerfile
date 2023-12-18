FROM ubuntu:latest

# Встановлення Nginx та інших необхідних пакетів
RUN apt-get update && apt-get -y install nginx

# Створення каталогів для зберігання статичних файлів
RUN mkdir -p /var/www/html

# Копіювання всіх файлів (html, стилі, js) до відповідних каталогів
COPY index.html /var/www/html/
COPY styles.css /var/www/html/
COPY script.js /var/www/html/

# Відкриття порту 80 для використання Nginx
EXPOSE 80

# Запуск Nginx
CMD ["nginx", "-g", "daemon off;"]
