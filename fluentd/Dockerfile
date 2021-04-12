FROM  fluent/fluentd:v1.12.2-debian-1.0
USER root
COPY fluent.conf /fluentd/etc/fluent.conf
COPY entrypoint.sh /bin/entrypoint.sh
RUN  gem install fluent-plugin-bigquery -v "2.2.0" --no-document && \
     gem sources --clear-all && \
     rm /usr/local/lib/ruby/gems/2.6.0/cache/*.gem && \
     chmod o+x /bin/entrypoint.sh && \
     mkdir /etc/gcloud && \
     mkdir -p /var/fluentd && \
     chown fluent:fluent /var/fluentd && \
     chown fluent:fluent /etc/gcloud
ENV GCLOUD_KEYFILE=/etc/gcloud/keyfile.json
USER fluent