# Use the official Ubuntu image as the base
FROM ubuntu:20.04

# Set environment variables for non-interactive installation
ENV DEBIAN_FRONTEND=noninteractive

# Update the package repository and install necessary dependencies
RUN apt-get update && apt-get install -y \
    curl \
    gnupg2 \
    apt-transport-https \
    ca-certificates \
    software-properties-common \
    && rm -rf /var/lib/apt/lists/*

# Add Microsoft's GPG key for their repository
RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add -

# Add the Microsoft SQL Server Ubuntu repository
RUN curl https://packages.microsoft.com/config/ubuntu/20.04/mssql-server-2019.list | tee /etc/apt/sources.list.d/mssql-server.list

# Update the package lists with the new repository and install MSSQL server
RUN apt-get update && apt-get install -y mssql-server

# Set environment variables for SQL Server
ENV MSSQL_PID=Express
ENV ACCEPT_EULA=Y
ENV SA_PASSWORD=YourPasswordHere123!

# Expose the default SQL Server port
EXPOSE 1433

# Start the SQL Server process when the container starts
CMD ["/opt/mssql/bin/sqlservr"]
