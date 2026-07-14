# **CAHIER DES CHARGES** 

**Architecture d'hébergement sécurisé** 

Application Web de gestion des stagiaires 

Version 1.0 Juillet 2026 

Cahier des charges - Infrastructure sécurisée 

## **1. Introduction et contexte** 

Dans le cadre de la digitalisation de la gestion administrative, le client souhaite mettre en place une application Web permettant la gestion des stagiaires : informations des stagiaires, demandes de stage, conventions, affectations, documents administratifs et suivi des périodes de stage. 

Afin de garantir la disponibilité, la confidentialité et l'intégrité des données, une infrastructure d'hébergement sécurisée est mise en place autour d'un serveur physique virtualisé avec Proxmox. 

## **2. Objectifs du projet** 

### **2.1 Objectifs fonctionnels** 

- Fournir une application Web accessible aux utilisateurs autorisés. 

- Permettre la gestion centralisée des stagiaires. 

- Faciliter le suivi administratif des stages. 

### **2.2 Objectifs techniques** 

- Héberger l'application sur une infrastructure virtualisée (Proxmox). 

- Sécuriser l'accès au service (firewall, VPN, HTTPS). 

- Protéger les données sensibles (base de données isolée). 

- Surveiller l'infrastructure en continu (Wazuh, Grafana, Prometheus). 

- Garantir la sauvegarde et la restauration des données. 

Page 2 



<!-- Start of picture text -->
Architecture: d'hébergement‘ sécurisé. - Vue simplifiée. =g:<br>(rem<br>HTTPS 443<br>pfSense<br>Firewall / VPN / IDS-IPS<br>Nginx Reverse Proxy + WAF LAN 10 - DMZ 172.16.10.0/24<br>SSL/ ModSecurity / OWASP CRS<br>i'earnServeureeePhysiqueeee eee- Proxmoxeee eee eensVE_P/TANSs isolésSe par pfSen eenseseH<br>1‘ 1<br>‘ 1<br>} VM Debian - Web VM Database VM Debian - Management 11<br>'' VLAN 20 - 172.16.20.0/24 VLAN 30 - 172.16.30.0/24 VLAN 40 - 172.16.40.0/24 H<br>1t Nginx local + Docker MariaDB / PostgreSQL Administration SSH H<br>‘ ApplicationAccés SSH Webrestreint Stagiaires AccessibleAucun uniquementaccés direct duinternet VLAN 20 SauvegardesAccés via VPN/ Automatisation + clé SSH 1H<br>'' Sauvegarde quotidienne Isolé du reste du LAN }<br>;! 1<br>' ' ' ' 1<br>' H ' ' 1<br>‘} VM Debian - Surveillance 111<br>i! VLAN 50 - 172.16.50.0/24 (lecture seule sur les autres VLAN) H<br>1! Wazubh (détection intrusions et logs) H<br>'' Grafana + Prometheus (supervision CPU / RAM / réseau / disponibilité) H<br>1' Alertes de sécurité en temps réel ;<br>1<br>HWHW‘111<br>i Traits pleins = flux autorisés | Traits pointillés = supervision/logs | Chaque VLAN isolé par pfSense, seuls les flux listés sont ouverts '<br>Nw www ww www www www wwe we wwe wwe meee www ewe meee eee eee eee eee eee eee enn’?'<br><!-- End of picture text -->

Cahier des charges - Infrastructure sécurisée 

## **4. Segmentation réseau** 

Le réseau interne est découpé en plusieurs VLAN (réseaux virtuels) afin d'isoler chaque fonction de l'infrastructure. Cette segmentation limite la propagation d'un incident : si une machine est compromise, l'attaquant ne peut pas accéder librement aux autres zones. Le pfSense joue le rôle de routeur inter-VLAN et applique une politique stricte : tout est bloqué par défaut, seuls les flux listés cidessous sont autorisés. 

### **4.1 Zones (VLAN)** 

|**VLAN**|**Zone**|**Plage réseau**|**Contenu**|
|---|---|---|---|
|VLAN 10|DMZ|172.16.10.0/24|Nginx Reverse Proxy + WAF (seule<br>zone exposée depuis Internet)|
|VLAN 20|Applicatif Web|172.16.20.0/24|VM Debian Web (application<br>stagiaires)|
|VLAN 30|Données|172.16.30.0/24|VM Base de données (MariaDB /<br>PostgreSQL)|
|VLAN 40|Administration|172.16.40.0/24|VM Management, accessible<br>uniquement via VPN|
|VLAN 50|Supervision|172.16.50.0/24|VM Surveillance (Wazuh, Grafana,<br>Prometheus)|



### **4.2 Principes de segmentation** 

- La base de données (VLAN 30) n'est jamais exposée directement à Internet et n'accepte des connexions que depuis le VLAN applicatif (VLAN 20). 

- Le VLAN d'administration (VLAN 40) n'est accessible que via VPN avec authentification par clé SSH, jamais depuis Internet en direct. 

- Le VLAN de supervision (VLAN 50) dispose d'un accès en lecture seule (collecte de logs et métriques) vers les autres VLAN, sans droit d'écriture. 

- Seule la DMZ (VLAN 10) est directement joignable depuis Internet, en HTTPS uniquement. 

- Aucune communication inter-VLAN n'est autorisée si elle n'est pas explicitement définie dans les règles du pare-feu pfSense. 

### **4.3 Matrice des flux autorisés** 

Page 4 

Cahier des charges - Infrastructure sécurisée 

|**Source → Destination**|**Port / Protocole**|**Autorisé**|**Remarque**|
|---|---|---|---|
|Internet → VLAN 10 (DMZ)|TCP 443 (HTTPS)|Oui|Seul flux entrant autorisé<br>depuis Internet|
|VLAN 10 → VLAN 20 (Web)|TCP 80/443|Oui|Reverse proxy vers<br>l'application|
|VLAN 20 → VLAN 30<br>(Données)|TCP 3306/5432|Oui|Application vers base de<br>données uniquement|
|VLAN 30 → Internet|Tous ports|Non|Aucune sortie directe vers<br>Internet|
|Poste admin → VLAN 40|VPN + SSH (22)|Oui, via VPN|Authentification par clé<br>obligatoire|
|VLAN 40 → VLAN 20 / 30 /<br>50|SSH (22)|Oui|Administration et<br>supervision uniquement|
|VLAN 50 → VLAN 10 / 20 /<br>30 / 40|Agents Wazuh / SNMP|Oui, lecture seule|Collecte de logs et<br>métriques uniquement|
|VLAN 20 → VLAN 30<br>(autres VM)|Tous ports|Non|Aucune communication<br>non listée entre VLAN|



Page 5 

Cahier des charges - Infrastructure sécurisée 

## **5. Description des composants** 

|**Composant**|**Rôle**|**Technologie**|**Sécurité associée**|
|---|---|---|---|
|pfSense|Pare-feu périmétrique,<br>VPN, IDS/IPS|pfSense|Blocage par défaut, ouverture<br>des seuls flux nécessaires|
|Nginx + WAF|Reverse proxy HTTPS,<br>protection applicative|Nginx, ModSecurity,<br>OWASP CRS|Chiffrement SSL, blocage<br>SQLi/XSS|
|VM Web|Hébergement de<br>l'application stagiaires|Debian, Nginx, Docker|SSH restreint, firewall local, mises<br>à jour|
|VM Base de données|Stockage des données<br>stagiaires|MariaDB / PostgreSQL|Aucun accès direct Internet,<br>sauvegarde quotidienne|
|VM Management|Administration de<br>l'infrastructure|Debian, SSH, scripts|Accès VPN, authentification par<br>clé|
|VM Surveillance|Supervision et détection<br>d'intrusions|Wazuh, Grafana,<br>Prometheus|Alertes temps réel, journalisation<br>centralisée|



Page 6 

Cahier des charges - Infrastructure sécurisée 

## **6. Sécurité de l'architecture** 

### **5.1 pfSense (pare-feu)** 

Première couche de protection : filtrage réseau, contrôle des ports, NAT, VPN, IDS/IPS. Politique 

appliquée : tout est bloqué par défaut, seuls les services strictement nécessaires sont autorisés. 

### **5.2 Reverse Proxy Nginx** 

Réception des connexions HTTPS, gestion des certificats SSL, redirection vers l'application et masquage du serveur interne. 

### **5.3 WAF (pare-feu applicatif)** 

Protection de l'application contre les attaques courantes : injection SQL, Cross-Site Scripting (XSS), requêtes HTTP malveillantes, via ModSecurity et l'OWASP Core Rule Set. 

### **5.4 Protection système** 

- Mises à jour régulières des systèmes et services. 

- Suppression des services inutiles. 

- Sécurisation des accès SSH et gestion des permissions. 

- Journalisation centralisée des événements. 

## **7. Gestion des accès utilisateurs** 

- Administrateur : gestion complète du système. 

- Responsable stage : gestion des stagiaires. 

- Encadreur : consultation et suivi. 

- Stagiaire : consultation de ses propres informations. 

## **8. Sauvegarde et restauration** 

### **7.1 Sauvegarde quotidienne** 

- Base de données. 

- Fichiers de l'application. 

### **7.2 Sauvegarde hebdomadaire** 

- Sauvegarde complète des machines virtuelles Proxmox. 

Objectif : garantir la continuité du service en cas de panne matérielle, d'erreur humaine ou d'incident de sécurité. 

Page 7 

Cahier des charges - Infrastructure sécurisée 

Page 8 

Cahier des charges - Infrastructure sécurisée 

## **9. Nos engagements sécurité envers le client** 

- Hébergement sécurisé sur infrastructure dédiée. 

- Accès HTTPS chiffré de bout en bout. 

- Protection par pare-feu périmétrique (pfSense). 

- Protection applicative Web (WAF). 

- Surveillance et supervision continues (Wazuh, Grafana, Prometheus). 

- Sauvegardes régulières et testées. 

- Séparation stricte des services (Web, Base de données, Management, Surveillance). 

- Gestion fine des droits utilisateurs selon les rôles. 

## **10. Évolutions futures possibles** 

- Cluster Proxmox et haute disponibilité. 

- Réplication des machines virtuelles. 

- Mise en place d'un répartiteur de charge (Load Balancer). 

- Authentification multi-facteurs (MFA). 

- SIEM avancé (ELK). 

- Plan de reprise d'activité (Disaster Recovery). 

Page 9 

