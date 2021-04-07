#!/bin/bash
set -eu
erb <<EOF > ${GCLOUD_KEYFILE}
{
  "type": "service_account",
  "project_id": "<%= ENV['GCLOUD_PROJECT'] %>",
  "private_key_id": "<%= ENV['GCLOUD_PRIVATE_KEY_ID'] %>",
  "private_key": "<%= ENV['GCLOUD_PRIVATE_KEY'] %>",
  "client_email": "<%= ENV['GCLOUD_SERVICE_ACCOUNT_NAME'] %>@<%= ENV['GCLOUD_PROJECT'] %>.iam.gserviceaccount.com",
  "client_id": "<%= ENV['GCLOUD_CLIENT_ID'] %>",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/<%= ENV['GCLOUD_SERVICE_ACCOUNT_NAME'] %>%40<%= ENV['GCLOUD_PROJECT'] %>.iam.gserviceaccount.com"
}
EOF


#source vars if file exists
DEFAULT=/etc/default/fluentd

if [ -r $DEFAULT ]; then
    set -o allexport
    . $DEFAULT
    set +o allexport
fi

# If the user has supplied only arguments append them to `fluentd` command
if [ "${1#-}" != "$1" ]; then
    set -- fluentd "$@"
fi

# If user does not supply config file or plugins, use the default
if [ "$1" = "fluentd" ]; then
    if ! echo $@ | grep ' \-c' ; then
       set -- "$@" -c /fluentd/etc/${FLUENTD_CONF}
    fi

    if ! echo $@ | grep ' \-p' ; then
       set -- "$@" -p /fluentd/plugins
    fi
fi

exec "$@"