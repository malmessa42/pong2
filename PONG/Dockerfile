# Use the official Python image from the Docker Hub
FROM python:3.11

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt /app/

# Install the dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . /app/

# Install Django Extensions for runserver_plus
RUN pip install django-extensions

# Expose the port your app runs on
EXPOSE 8000

# Copy your SSL certificate and key into the container
COPY cert.pem /app/cert.pem
COPY key.pem /app/key.pem

# Command to run migrations and start your Django app with HTTPS
CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver_plus --cert-file cert.pem --key-file key.pem 0.0.0.0:8000"]
