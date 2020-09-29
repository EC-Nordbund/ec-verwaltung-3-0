---
title: Ordnerstrucktur
description: ''
position: 3
category: Einstieg
---

## Dokumentation
Diese Dokumentation findest du im Ordner `/docs`. Wir nutzen dafür `@nuxt/content-theme-docs` damit können wir sehr simpel Markdown Docs schreiben.

## Workers
Im `/workers` Ordner findest du alle unsere WebWorker jeder einzelne Wird kompiliert und in useren Client eingebunden.

Wir benutzen `comlink` für die Kommunikation zwischen den Workern und dem Main Thread.

### ServiceWorker
Unser serviceWorker befindet sich im Ordner `/workers/service` wir scheiben die gesamte Cachelogik selbst dadurch können wir es grade unseren Bedingungen anpassen. Uns ist nämlich bei dieser Seite die initale Ladezeit egal solage weitere Anfragen schnell sind d.h. wir nutzen kein Code-Splitting und bundeln die gesammte Applikation in eine `css` und eine `js` Datei.

### Cache Worker
Im Ordner `/worker/cache` befindet sich unser Cache Worker. Dieser ist dafür da alle Daten (tw. verschlüsselt) in IndexedDB zu speichern. Wir nutzen dabei `IDB` als wrapper von IndexedDB da so die Syntax deutlich angenehmer wird. Als verschlüsselungsmethode nutzen wir die Funktionen des Browsers im `crypto` Object. Diese Logik ist in ein eigenes Packet im `/shared` Ordner.

### Network Worker
Im Ordner `/worker/network` entwickeln wir unsern Network Worker dies übernimmt alle Anfragen an die API. Dadurch laufen diese auf einem anderen Theread und wir entlasten so den Hauptthread.

Der Cache Worker und der Network Worker liefern eine ähnliche API die im Hauptthread zusammengeführt wird.


## Shared
### Verschlüsselung
### Types