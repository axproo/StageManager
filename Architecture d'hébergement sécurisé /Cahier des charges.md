# **CAHIER DES CHARGES** 

## **Architecture d'hébergement sécurisé** 

Application Web de gestion des stagiaires 

Cahier des charges - Infrastructure sécurisée 

### **1. Introduction et contexte** 

Dans le cadre de la digitalisation de la gestion administrative, le client souhaite mettre en place une application Web permettant la gestion des stagiaires : informations des stagiaires, demandes de stage, conventions, affectations, documents administratifs et suivi des périodes de stage. 

Afin de garantir la disponibilité, la confidentialité et l'intégrité des données, une infrastructure d'hébergement sécurisée est mise en place autour d'un serveur physique virtualisé avec Proxmox. 

### **2. Objectifs du projet** 

#### **2.1 Objectifs fonctionnels** 

- Fournir une application Web accessible aux utilisateurs autorisés. 

- Permettre la gestion centralisée des stagiaires. 

- Faciliter le suivi administratif des stages. 

#### **2.2 Objectifs techniques** 

- Héberger l'application sur une infrastructure virtualisée (Proxmox). 

- Sécuriser l'accès au service (firewall, VPN, HTTPS). 

- Protéger les données sensibles (base de données isolée). 

- Surveiller l'infrastructure en continu (Wazuh, Grafana, Prometheus). 

- Garantir la sauvegarde et la restauration des données. 


Cahier des charges - Infrastructure sécurisée 

### **3. Exigences de performance et de capacité** 

#### **3.1 Utilisateurs et charge attendue** 

Ces chiffres sont des estimations de dimensionnement ; ils seront affinés avec le client avant la mise en production. 

|**Indicateur**|**Estimation**|**Remarque**|
|---|---|---|
|Utilisateurs enregistrés|≈ 100 à 200 comptes|Stagiaires, encadreurs, responsables<br>cumulés|
|Utilisateurs simultanés (pic)|≈ 15 à 25|Pics lors des périodes de dépôt de<br>candidatures/conventions|
|Dimensionnement cible|30 utilisateurs concurrents|Adapté aux ressources réelles du<br>serveur (4 cœurs / 11,47 Go RAM)|



#### **3.2 Volumétrie des données et croissance** 

|**Type de donnée**|**Volume initial estimé**|**Croissance annuelle**|
|---|---|---|
|Base de données (dossiers,<br>conventions)|≈ 2 à 5 Go|+15 % / an|
|Documents administratifs (PDF, scans)|≈ 5 à 10 Go|+20 % / an|
|Logs (sécurité, applicatifs,<br>supervision)|≈ 3 Go / mois|Stable, purge selon politique de<br>rétention|


Le stockage est dimensionné avec une marge, et les disques virtuels Proxmox peuvent être étendus à chaud sans interruption de service. 

### **4. Objectifs de disponibilité (RPO / RTO)** 

Le RPO (Recovery Point Objective) définit la perte de données maximale tolérée ; le RTO (Recovery Time Objective) définit le délai maximal acceptable pour rétablir le service après un incident. 

|**Composant**|**RPO (perte de données**<br>**max.)**|**RTO (délai de reprise)**|**Moyen**|
|---|---|---|---|
|Base de données|24 h|4 h|Sauvegarde quotidienne +<br>restauration ciblée|
|Application Web|24 h|4 h|Restauration à partir de la<br>sauvegarde VM|
|Infrastructure complète<br>(Proxmox)|7 jours|8 à 24 h|Sauvegarde hebdomadaire<br>complète des VM|


Cahier des charges - Infrastructure sécurisée 

**6. Infrastructure physique et virtuelle** 

#### **6.1 Serveur physique** 

|**Caractéristique**|**Valeur observée (environnement actuel)**|
|---|---|
|Nœud Proxmox|srv-proxmox-axproo|
|Processeur|4 cœurs (CPU)|
|Mémoire vive (RAM)|11,47 Gio au total|
|Stockage|981,67 Gio (~1 To) au total|
|Hyperviseur|Proxmox VE 9.0.11|
|Charge actuelle|CPU 10 %, RAM 82 % (VM Windows Server 2019 existante), stockage 6 %|



_Point d'attention : avec seulement ≈ 2 Go de RAM libres actuellement (82 % déjà utilisés par la VM Windows Server 2019), le déploiement des 4 VM ci-dessous nécessite soit de libérer/redimensionner cette VM existante, soit d'ajouter de la RAM au serveur physique._ 

**6.2 Machines virtuelles** 

|**VM**|**vCPU**|**RAM**|**Disque**|**Système**|**Rôle**|
|---|---|---|---|---|---|
|pfSense|1|2 Go|100 Go|pfSense CE 2.7.x|Pare-feu / VPN /<br>IDS-IPS / DNS /<br>NTP|
|VM Application|2|3 Go|200 Go|Debian 12<br>(Bookworm)|Conteneurs Front<br>(Nginx+WAF) et<br>Back (API)|
|VM Base de<br>données|1|1 Go|50 Go|Debian 12<br>(Bookworm)|MariaDB /<br>PostgreSQL|
|VM Monitoring|1|1 Go|100 Go|Debian 12<br>(Bookworm)|Wazuh, Grafana,<br>Prometheus|



Dimensionnement total : ≈ 5 vCPU (léger sur-provisionnement, usuel en virtualisation) et ≈ 7,5 Go de RAM pour les 4 VM. Ces caractéristiques constituent un dimensionnement optimisé pour le matériel existant ; elles pourront être révisées après validation des volumes réels avec le client (voir section 3). 

Cahier des charges - Infrastructure sécurisée 

### **7. Segmentation réseau** 

Le réseau interne est découpé en 4 VLAN afin d'isoler chaque fonction de l'infrastructure. Cette segmentation limite la propagation d'un incident : si une machine est compromise, l'attaquant ne peut pas accéder librement aux autres zones. Le pfSense joue le rôle de routeur inter-VLAN et applique une politique stricte : tout est bloqué par défaut, seuls les flux listés ci-dessous sont autorisés. 

#### **7.1 Principes de segmentation** 

- La base de données (VLAN 30) n'est jamais exposée directement à Internet et n'accepte des connexions que depuis le VLAN applicatif (VLAN 20), et plus précisément depuis le conteneur Back. 

- À l'intérieur même de la VM Application (VLAN 20), le conteneur Front (exposé) et le conteneur Back (jamais exposé) sont isolés par un réseau Docker interne dédié. 

- Il n'y a pas de VLAN d'administration dédié : l'accès administrateur se fait par VPN directement vers les VLAN 20, 30 ou 40 selon le besoin, avec authentification par clé SSH obligatoire, jamais depuis Internet en direct. 

- Le VLAN de supervision (VLAN 40) dispose d'un accès en lecture seule (collecte de logs et métriques) vers les autres VLAN, sans droit d'écriture. 

- Seule la DMZ (VLAN 10, interface pfSense) est directement joignable depuis Internet, en HTTPS uniquement. 

- Aucune communication inter-VLAN n'est autorisée si elle n'est pas explicitement définie dans les règles du pare-feu pfSense. 

#### **7.2 Services réseau transverses : DNS et NTP** 

- DNS : un résolveur DNS interne (Unbound, intégré à pfSense) gère la résolution de noms entre les VLAN. Aucune VM interne ne résout de nom directement sur Internet, sauf le pfSense luimême vers des résolveurs publics. 

- NTP : toutes les VM synchronisent leur horloge sur une source de temps centralisée (pfSense), elle-même synchronisée sur des serveurs NTP publics (pool.ntp.org). Une horloge cohérente est indispensable à la corrélation des journaux (Wazuh, Suricata) et à toute investigation postincident. 

#### **7.3 Matrice des flux autorisés** 

|**Source → Destination**|**Port / Protocole**|**Autorisé**|**Remarque**|
|---|---|---|---|
|Internet → VLAN 10 (DMZ /<br>pfSense)|TCP 443 (HTTPS)|Oui|Seul flux entrant autorisé<br>depuis Internet|
|VLAN 10 → VLAN 20<br>(conteneur Front)|TCP 80/443|Oui|Reverse proxy vers le<br>conteneur Front|


|**Source → Destination**|**Port / Protocole**|**Autorisé**|**Remarque**|
|---|---|---|---|
|Conteneur Front →<br>Conteneur Back (VLAN 20)|Port interne Docker|Oui|Réseau Docker interne,<br>jamais exposé|
|VLAN 20 (Back) → VLAN 30<br>(Données)|TCP 3306/5432|Oui|Backend vers base de<br>données uniquement|
|VLAN 30 → Internet|Tous ports|Non|Aucune sortie directe vers<br>Internet|
|Poste admin → VLAN 20 /<br>30 / 40|VPN + SSH (22)|Oui, via VPN|Authentification par clé<br>obligatoire, pas de VLAN<br>Management dédié|
|VLAN 40 → VLAN 10 / 20 /<br>30|Agents Wazuh / SNMP|Oui, lecture seule|Collecte de logs et<br>métriques uniquement|
|VLAN 20 → VLAN 30 (autre<br>trafic)|Tous ports|Non|Aucune communication non<br>listée entre VLAN|
|Tous VLAN → pfSense|UDP/TCP 53 (DNS)|Oui|Résolution de noms interne<br>(Unbound)|
|Tous VLAN → pfSense|UDP 123 (NTP)|Oui|Synchronisation horaire<br>centralisée|
|pfSense → Internet|UDP/TCP 53, UDP 123|Oui|Résolution DNS externe et<br>synchronisation NTP<br>publique|

### **8. Description des composants** 

|**Composant**|**Rôle**|**Technologie**|**Sécurité associée**|
|---|---|---|---|
|pfSense|Pare-feu périmétrique,<br>VPN, IDS/IPS, DNS, NTP|pfSense CE 2.7.x|Blocage par défaut, ouverture des<br>seuls flux nécessaires|
|Conteneur Front (VM<br>Application)|Reverse proxy HTTPS,<br>protection applicative|Nginx, ModSecurity,<br>OWASP CRS|Chiffrement SSL, blocage SQLi/XSS,<br>seul point exposé|
|Conteneur Back (VM<br>Application)|Logique métier de<br>l'application stagiaires|API applicative, Docker|Jamais exposé directement,<br>accessible uniquement depuis le<br>conteneur Front|
|VM Base de données|Stockage des données<br>stagiaires|MariaDB / PostgreSQL|Aucun accès direct Internet,<br>sauvegarde quotidienne|
|VM Monitoring|Supervision et détection<br>d'intrusions|Wazuh, Grafana,<br>Prometheus|Alertes temps réel, journalisation<br>centralisée, accès lecture seule|

### **9. Sécurité de l'architecture** 

#### **9.1 pfSense (pare-feu)** 

Première couche de protection : filtrage réseau, contrôle des ports, NAT, VPN, IDS/IPS. Politique appliquée : tout est bloqué par défaut, seuls les services strictement nécessaires sont autorisés. 

#### **9.2 Reverse Proxy Nginx** 

Réception des connexions HTTPS, gestion des certificats SSL, redirection vers l'application et masquage du serveur interne. 

#### **9.3 WAF (pare-feu applicatif)** 

Protection de l'application contre les attaques courantes : injection SQL, Cross-Site Scripting (XSS), requêtes HTTP malveillantes, via ModSecurity et l'OWASP Core Rule Set. 

#### **9.4 IDS / IPS : choix de Suricata** 

Suricata est retenu plutôt que Snort pour cette architecture, principalement pour sa capacité à exploiter plusieurs cœurs CPU en mode IPS inline, ce qui correspond au dimensionnement multi-cœurs du serveur physique. 

|**Critère**|**Suricata (retenu)**|**Snort**|
|---|---|---|
|Traitement multi-<br>thread|Natif, exploite plusieurs cœurs|Limité (mono-thread historiquement)|
|Mode IPS inline|Supporté nativement|Supporté via add-on|
|Intégration pfSense|Paquet officiel, bien maintenu|Paquet officiel, plus ancien|
|Jeux de règles|Compatible ET Open / Suricata-specific|Compatible ET Open / Snort rules|
|Performance sur<br>trafic élevé|Meilleure grâce au multi-thread|Plus limitée|



- Déploiement en mode IPS inline sur les interfaces WAN et DMZ. 

- Jeu de règles Emerging Threats (ET Open), mis à jour automatiquement. 

- Alertes remontées vers Wazuh pour corrélation avec les autres journaux. 

#### **9.5 Supervision de sécurité : Wazuh** 

- Agents Wazuh déployés sur toutes les VM (Web, Base de données, Management). 

- File Integrity Monitoring (FIM) sur les répertoires sensibles (/etc, configurations Nginx, binaires système). 

- Détection de rootkits et analyse des journaux système et applicatifs. 

- Corrélation avec les alertes Suricata et les logs pfSense pour une vue de sécurité centralisée. 

- Classification des alertes par niveau de criticité et remontée à l'équipe d'astreinte. 

#### **9.6 Politique SSH** 

9.6 Politique SSH 
Cette politique de durcissement s'applique à toutes les VM administrables en SSH (VM Application, VM 
Base de données, VM Monitoring) ainsi qu'au pfSense. 
9.6.1 Authentification 
- Authentification par clé SSH uniquement ; l'authentification par mot de passe est désactivée 
(PasswordAuthentication no). 
- Connexion directe du compte root interdite (PermitRootLogin no) ; connexion nominative puis 
élévation de privilèges via sudo. 
- Clés modernes uniquement : Ed25519 (ou RSA 4096 bits minimum) ; les clés DSA et RSA 
inférieures à 2048 bits sont interdites. 
- Authentification multi-facteurs (TOTP via PAM) exigée en complément de la clé pour les 
comptes administrateurs les plus sensibles. 
9.6.2 Accès réseau 
- SSH jamais exposé directement à Internet : accessible uniquement via le VPN, conformément à 
la segmentation réseau (section 7). 
- Restriction par IP source (AllowUsers ou pare-feu local nftables) en complément du filtrage 
pfSense, en défense en profondeur. 
- Changement du port SSH par défaut (22) vers un port non standard, pour réduire le bruit des 
scans automatisés (mesure secondaire, non suffisante seule). 
9.6.3 Limitation des tentatives 

- Fail2ban : bannissement automatique après 3 tentatives échouées, avec durée de bannissement 
progressive en cas de récidive. 
- MaxAuthTries fixé à 3 tentatives par connexion. 
- LoginGraceTime réduit à 30 secondes avant expiration d'une connexion non authentifiée. 
9.6.4 Session et durcissement du démon SSH
 
- Déconnexion automatique après inactivité (ClientAliveInterval / ClientAliveCountMax, environ 
10 minutes). 
- Désactivation des redirections inutiles : X11Forwarding, AllowTcpForwarding, 
AllowAgentForwarding désactivés sauf besoin explicite. 
- Limitation du nombre de connexions/sessions simultanées (MaxSessions, MaxStartups) contre 
les tentatives de bruteforce ou de déni de service. 
- Bannière légale d'avertissement affichée avant authentification. 
9.6.5 Traçabilité
 
Cahier des charges - Infrastructure sécurisée 
- Journalisation complète des connexions, déconnexions et commandes exécutées via sudo. 
- Logs SSH remontés vers la VM Monitoring (Wazuh) pour corrélation et alerte en cas de tentative 
suspecte, d'horaire ou d'IP inhabituels. 
- Conservation des logs conformément à la politique définie en section 12 (Journalisation et 
RGPD). 
9.6.6 Gestion des clés 

- Une clé SSH strictement individuelle par administrateur, jamais de clé partagée entre plusieurs 
personnes. 
- Révocation immédiate d'une clé lors du départ d'un administrateur, alignée sur la politique de 
gestion des comptes (section 11.2). 
- Passphrase obligatoire sur toute clé privée stockée côté poste client. 
9.7 Protection système générale 
- Mises à jour régulières des systèmes et services. 
- Suppression des services inutiles. 
- Gestion stricte des permissions et journalisation centralisée des événements.

#### **9.7 Protection système générale** 

- Mises à jour régulières des systèmes et services. 

- Suppression des services inutiles. 

- Gestion stricte des permissions et journalisation centralisée des événements. 


### **10. Conteneurisation (Docker)** 

L'application Web est packagée et exécutée via Docker sur la VM Application, avec un conteneur Front (Nginx + WAF) et un conteneur Back (API) isolés par un réseau Docker interne. 

#### **10.1 Mode de déploiement** 

- Déploiement via Docker Compose sur la VM Application : simple à opérer, à sauvegarder et à sécuriser. 

- Une orchestration multi-nœuds (Kubernetes, Docker Swarm) n'est pas retenue à ce stade : elle ajouterait une complexité opérationnelle (service discovery, observabilité distribuée, gestion de cluster) disproportionnée par rapport au volume d'utilisateurs attendu (section 3) et aux ressources matérielles disponibles (section 6). 

#### **10.2 Choix d'architecture applicative : monolithe modulaire plutôt que microservices** 

- L'application est découpée en 2 conteneurs (Front et Back) plutôt qu'en architecture microservices complète, compte tenu de la taille de l'équipe et du volume d'utilisateurs attendu. 

- Les microservices deviennent pertinents si l'application doit évoluer vers plusieurs équipes de développement autonomes ou une montée en charge très importante ; ce n'est pas le cas ici. 

- Cette approche reste compatible avec une évolution future : les modules bien séparés dans le code pourront être extraits en services indépendants si le besoin apparaît. 

#### **10.3 Bonnes pratiques associées** 

- Images construites à partir de bases officielles minimalistes (ex. images "slim"), sans outils inutiles. 

- Analyse de vulnérabilités des images avant déploiement (ex. Trivy). 

- Conteneurs exécutés avec un utilisateur non-root et des volumes en lecture seule lorsque possible. 

### **11. Gestion des comptes et des accès** 

#### **11.1 Rôles utilisateurs** 

- Administrateur : gestion complète du système. 

- Responsable stage : gestion des stagiaires. 

- Encadreur : consultation et suivi. 

- Stagiaire : consultation de ses propres informations. 

#### **11.2 Politique de gestion des comptes** 

- Création de compte sur demande validée par le responsable stage ; application du principe du moindre privilège. 

- Mots de passe : 12 caractères minimum, complexité exigée, renouvellement périodique pour les comptes à privilèges. 

- Authentification multi-facteurs (MFA) recommandée pour les comptes administrateurs. 

- Désactivation immédiate du compte à la fin du stage ou du contrat. 

- Revue périodique des comptes actifs et des droits attribués. 

### **12. Journalisation et conformité RGPD** 

#### **12.1 Types de journalisation** 

- Logs système : authentifications, actions administrateur (sudo), démarrage/arrêt de services. 

- Logs de sécurité : pare-feu pfSense, IDS/IPS Suricata, WAF ModSecurity. 

- Logs applicatifs : accès à l'application, erreurs, actions utilisateurs significatives. 

- Logs de supervision : alertes Wazuh, métriques Grafana/Prometheus. 

- Durée de conservation indicative : 1 an pour les logs de sécurité, 6 à 12 mois pour les logs applicatifs, conformément aux recommandations de bonnes pratiques. 

#### **12.2 Conformité RGPD** 

- Minimisation des données : seules les données strictement nécessaires à la gestion des stagiaires sont collectées. 

- Durée de conservation des données personnelles définie contractuellement avec le client, en fonction de la finalité du traitement. 

- Droits des personnes concernées (stagiaires, encadreurs) : accès, rectification, effacement, sur demande auprès du client. 

- Chiffrement des données sensibles au repos et en transit (HTTPS, chiffrement base de données si nécessaire). 

- Le client, en tant que responsable de traitement, tient le registre des traitements ; le prestataire agit en tant que sous-traitant pour les aspects techniques et de sécurité. 

- En cas de violation de données, notification à la CNIL sous 72 h à l'initiative du client, avec l'appui technique du prestataire pour qualifier l'incident. 

### **13. Sauvegarde et restauration** 

#### **13.1 Sauvegarde quotidienne** 

- Base de données. 

- Fichiers de l'application. 

#### **13.2 Sauvegarde hebdomadaire** 

- Sauvegarde complète des machines virtuelles Proxmox. 

Objectif : garantir la continuité du service en cas de panne matérielle, d'erreur humaine ou d'incident de sécurité, conformément aux objectifs de RPO/RTO définis en section 4. 

### **14. Répartition des responsabilités (Client / Prestataire)** 

|**Activité**|**Client**|**Prestataire**|
|---|---|---|
|Exactitude des données stagiaires saisies|Responsable|-|
|Validation des demandes de création de compte|Responsable|Consulté|
|Administration technique de l'infrastructure|-|Responsable|
|Application des correctifs de sécurité|Informé|Responsable|
|Exécution et vérification des sauvegardes|Informé|Responsable|
|Décision de continuité d'activité (sinistre majeur)|Responsable|Conseil|
|Conformité RGPD - finalité et base légale des<br>traitements|Responsable<br>(responsable de<br>traitement)|Conseil|
|Sécurité technique des données (chiffrement, accès)|Informé|Responsable (sous-<br>traitant)|
|Notification en cas d'incident de sécurité (CNIL)|Décideur final|Alerte et appui technique|


### **15. Nos engagements sécurité envers le client** 

- Hébergement sécurisé sur infrastructure dédiée. 

- Accès HTTPS chiffré de bout en bout. 

- Protection par pare-feu périmétrique (pfSense) et IDS/IPS (Suricata). 

- Protection applicative Web (WAF). 

- Surveillance et supervision continues (Wazuh, Grafana, Prometheus). 

- Sauvegardes régulières et testées, alignées sur des objectifs de RPO/RTO définis. 

- Séparation stricte des services (Web, Base de données, Management, Surveillance). 

- Gestion fine des droits utilisateurs selon les rôles, conforme aux exigences RGPD. 

### **16. Évolutions futures possibles** 

- Cluster Proxmox et haute disponibilité. 

- Réplication des machines virtuelles. 

- Mise en place d'un répartiteur de charge (Load Balancer). 

- Authentification multi-facteurs (MFA) généralisée à tous les comptes. 

- SIEM avancé (ELK). 

- Plan de reprise d'activité (Disaster Recovery). 

- Infrastructure as Code (Terraform) et automatisation de la configuration (Ansible). 

