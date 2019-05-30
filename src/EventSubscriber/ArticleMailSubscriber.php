<?php
/**
 * Created by PhpStorm.
 * User: syfea
 * Date: 26/04/19
 * Time: 15:19
 */

namespace App\EventSubscriber;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Article;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\GetResponseForControllerResultEvent;
use Symfony\Component\HttpKernel\KernelEvents;


final class ArticleMailSubscriber implements EventSubscriberInterface
{
    private $mailer;

    public function __construct(\Swift_Mailer $mailer)
    {
        $this->mailer = $mailer;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['sendMail', EventPriorities::POST_WRITE],
        ];
    }

    public function sendMail(GetResponseForControllerResultEvent $event)
    {
        $article = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if (!$article instanceof Article || Request::METHOD_POST !== $method) {
            return;
        }

        $message = (new \Swift_Message('Un nouvel article est créé.'))
            ->setFrom(getenv('MAILER_ADDRESS'))
            ->setTo(getenv('MAILER_ADDRESS_TO'))
            ->setBody(sprintf('Article %s par l\'auteur %s.', $article->getId(), $article->getUser()->getFullName()));

        $this->mailer->send($message);
    }
}