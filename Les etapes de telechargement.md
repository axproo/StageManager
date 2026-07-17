# **Télécharger Debian sur Proxmox**

## **1\. Pour un conteneur Debian LXC (CT)**

### **Étape 1 : Mettre à jour la liste des templates**

Récupérer les derniers templates disponibles depuis les dépôts Proxmox :

pveam update

### **Étape 2 : Lister les templates Debian disponibles**

Afficher les templates Debian disponibles :

pveam available | grep debian

### **Étape 3 : Télécharger le template Debian**

Télécharger le template choisi dans le stockage des conteneurs Proxmox (généralement local) :

pveam download local debian-12-standard_12.2-1_amd64.tar.zst

Remplacer debian-12-standard_12.2-1_amd64.tar.zst par le nom exact obtenu avec la commande précédente.

# **2\. Pour une installation Debian avec ISO (VM)**

Se placer dans le dossier des ISO Proxmox :

cd /var/lib/vz/template/iso

Télécharger l'image ISO Debian :

wget <https://cdimage.debian.org/cdimage/archive/12.15.0/amd64/iso-cd/debian-12.15.0-amd64-netinst.iso>

Après le téléchargement, l'ISO sera disponible dans :

/var/lib/vz/template/iso

Vous pourrez ensuite créer une **VM Debian** depuis l'interface web Proxmox en sélectionnant cette ISO.

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