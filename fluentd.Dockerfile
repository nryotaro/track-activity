FROM  fluent/fluentd:v1.12.2-debian-1.0
USER root
RUN  gem install fluent-plugin-gcs -v "0.4.0" --no-document && \
     gem sources --clear-all && \
     rm /usr/local/lib/ruby/gems/2.6.0/cache/*.gem
COPY td-agent.conf /etc/td-agent/td-agent.conf
USER fluent
# https://github.com/fluent/fluentd-docker-image/blob/master/v1.12/debian/Dockerfile 