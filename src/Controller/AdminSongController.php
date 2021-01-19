<?php

namespace App\Controller;

use App\Entity\Song;
use App\Type\SongType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class AdminSongController
 * @package App\Controller
 *
 * @Route("/admin/songs", schemes={"%protocol%"})
 */
class AdminSongController extends AbstractController
{
    /**
     * @Route("/", name="admin_songs")
     * @IsGranted("IS_AUTHENTICATED_FULLY")
     * @IsGranted("TWITCH_ID")
     *
     * @param Request $request
     * @return RedirectResponse|Response
     */
    public function songsAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $songRepo = $em->getRepository(Song::class);

        // HANDLE CHANGES
        if ($request->isMethod(Request::METHOD_POST)) {
            // SONG DELETE
            if ($request->request->has('delete_song')) {
                $songId = $request->request->get('delete_song');
                $songToDelete = $songRepo->find($songId);
                if ($songToDelete !== null) {
                    $em->remove($songToDelete);
                }
            }
            // SONG ACTIVATION
            if ($request->request->has('activation_song')) {
                $songId = $request->request->get('activation_song');
                $songToChangeState = $songRepo->find($songId);
                if ($songToChangeState !== null) {
                    $songToChangeState->setActivated(!$songToChangeState->isActivated());
                }
            }
        }

        $em->flush();

        $songs = $songRepo->findBy([], ['id' => 'desc']);

        return $this->render('admin/song/songs.html.twig', [
            'songs' => $songs,
        ]);
    }

    /**
     * @Route("/create", name="admin_songs_create")
     * @IsGranted("IS_AUTHENTICATED_FULLY")
     * @IsGranted("TWITCH_ID")
     *
     * @param Request $request
     * @return Response|RedirectResponse
     */
    public function createSongAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        $song = new Song();
        $songForm = $this->createForm(SongType::class, $song);

        $songForm->handleRequest($request);
        if ($songForm->isSubmitted() && $songForm->isValid()) {
            $em->persist($song);
            $em->flush();

            return $this->redirectToRoute('admin_songs');
        }

        return $this->render('admin/song/create.html.twig', [
            'songForm' => $songForm->createView(),
        ]);
    }

    /**
     * @Route("/edit/{id}", name="admin_songs_edit")
     * @IsGranted("IS_AUTHENTICATED_FULLY")
     * @IsGranted("TWITCH_ID")
     *
     * @param Request $request
     * @param Song $song
     * @return Response|RedirectResponse
     */
    public function updateSongAction(Request $request, Song $song)
    {
        $em = $this->getDoctrine()->getManager();

        $songForm = $this->createForm(SongType::class, $song);

        $songForm->handleRequest($request);
        if ($songForm->isSubmitted() && $songForm->isValid()) {
            $em->flush();

            return $this->redirectToRoute('admin_songs');
        }

        return $this->render('admin/song/update.html.twig', [
            'song' => $song,
            'songForm' => $songForm->createView(),
        ]);
    }
}
