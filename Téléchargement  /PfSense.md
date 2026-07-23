# **Télécharger pfSense sur Proxmox**

## **Étape 1 : Aller dans le dossier des ISO Proxmox**

cd /var/lib/vz/template/iso

## **Étape 2 : Télécharger l'image pfSense**

Télécharger l'archive ISO pfSense Community Edition :

wget <https://atxfiles.netgate.com/mirror/downloads/pfSense-CE-2.8.0-amd64.iso.gz>

## **Étape 3 : Décompresser l'image ISO**

L'ISO est téléchargée sous forme compressée .gz. Pour l'extraire :

gunzip pfSense-CE-2.8.0-amd64.iso.gz

Après extraction, vous obtenez :

pfSense-CE-2.8.0-amd64.iso

dans le répertoire :

/var/lib/vz/template/iso

## **Étape 4 : Vérifier la présence de l'ISO**

ls -lh /var/lib/vz/template/iso

Vous devriez voir :

pfSense-CE-2.8.0-amd64.iso